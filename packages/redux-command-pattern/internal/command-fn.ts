import { get, noop } from 'lodash';
import { StandardCommand } from './standard-command';
import { isStandardEvent, StandardEvent, StandardEventAny } from './standard-event';
import { Dispatch, GetState } from './store';
import {
    AnyTypeOf, assertNever, Await, DeepDictionary, DeepDictionaryItem, defer, exec, Func, isAsyncGenerator, isAsyncIterable, isGenerator, isIterable, isObservable, isPromiseLike,
    isThunk, Observable, restify, Restify, Thunk
} from './utils';
import { setImmediateAsync } from './utils/async-timers';

type CommandGenerator<TState, TEvent extends StandardEventAny | void> = Generator<CommandResult<TState, TEvent>, CommandResult<TState, TEvent> | void, [TState | undefined]>;
type AsyncCommandGenerator<TState, TEvent extends StandardEventAny | void> = AsyncGenerator<CommandResult<TState, TEvent>, CommandResult<TState, TEvent> | void, Promise<TState>>;

type CommandIterable<TState, TEvent extends StandardEventAny | void> = Iterable<CommandResult<TState, TEvent>>;
type AsyncCommandIterable<TState, TEvent extends StandardEventAny | void> = AsyncIterable<CommandResult<TState, TEvent>>;

// type Thunk = Func<Dispatch>;
// type CommandResult<TState, TEvent extends StandardEventAny | void> =
//   | TEvent
//   | Thunk
//   | Observable<TEvent>
//   | PromiseLike<CommandResult<TState, TEvent>>
//   | Generator<CommandResult<TState, TEvent>, CommandResult<TState, TEvent>, {state: TState}>
//   | AsyncGenerator<CommandResult<TState, TEvent>, CommandResult<TState, TEvent>, Promise<TState>>
//   | Iterable<CommandResult<TState, TEvent>>
//   | AsyncIterable<CommandResult<TState, TEvent>> // including this makes generator functions return 'never' type from yields
  ;
type CommandResult<TState, TEvent extends StandardEventAny | void> = AnyTypeOf<TEvent, void, [TState], Promise<TState>>;
export type CommandFn<TState, TPayload, TEvents extends StandardEventAny | void> =
  (state:TState, ...payload:Restify<TPayload>) => CommandResult<TState, TEvents>// | PromiseLike<CommandResult<TState>>


export type CommandFnAny = CommandFn<any, any, any>;

// export type CommandFnMap<TState = any> = DeepDictionary<CommandFn<TState, any>>

// export type CommandFnOrMap<TState = any> = CommandFn<TState, any> | CommandFnMap<TState>;

type CommandFnMap = DeepDictionaryItem<CommandFnAny>;
type Infer<T extends CommandFnMap> = T extends DeepDictionaryItem<CommandFn<infer TState, infer TPayload, infer TEvents>>
  ? [TState, TPayload, TEvents]
  : never;
export type InferState<T extends CommandFnMap> = Infer<T>[0];
export type InferPayload<T extends CommandFnMap> = Infer<T>[1];
export type InferEvents<T extends CommandFnMap> = Infer<T>[2];

// export type InferPayload<TCommandFn extends CommandFnAny> = TCommandFn extends CommandFn<any, infer TPayload> ? TPayload : never;



type Canceller = Func;
type FromResult<T> = T extends CommandResult<infer TState, infer TEvents> ? [TState, TEvents] : never;
interface Store<TState, TEvents extends StandardEvent = StandardEventAny> {
  dispatch: Dispatch<TEvents>,
  getState: GetState<TState>
};
export function createCommandHandler<T extends DeepDictionary<CommandFnAny>>(store: Store<InferState<T>, InferEvents<T>>, implementation: T): Func<StandardCommand<InferPayload<T>>, Canceller> {
  type TState = InferState<T>;
  type TPayload = InferPayload<T>;
  type TEvents = InferEvents<T>;

  return function handleCommand({ type, payload }: StandardCommand<TPayload>): Canceller {
    const fn = get(implementation, type) as CommandFn<TState, TPayload, TEvents>;
    const result = fn(store.getState(), ...restify(payload));

    return handle(result, store);

  };
}
type AnyStore = Store<any, any>;
type Result<T extends AnyStore> =
  T extends Store<infer TState, infer TEvents> ? CommandResult<TState, TEvents> : never;
function handle<TState, TEvents extends StandardEventAny>(result: CommandResult<TState, TEvents>, store:Store<TState, TEvents>): Canceller {
  if (!result) {
    return noop;
  }
  if (isStandardEvent(result)) {
    return handleStandardAction(result, store);
  }
  if (isThunk(result)) {
    return handleThunk(result, store);
  }
  if (isObservable(result)) {
    return handleObservable(result, store);
  }
  if (isPromiseLike(result)) {
    return handlePromiseLike(result, store);
  }
  if (isGenerator(result)) {
    return handleGenerator(result, store);
  }
  if (isAsyncGenerator(result)) {
    return handleAsyncGenerator(result, store)
  }

  if (isIterable(result)) {
    return handleIterable(result, store);
  }
  if (isAsyncIterable(result)) {
    return handleAsyncIterable(result, store);
  }

  return assertNever(result);
}
function handleIterable<TStore extends AnyStore>(value: Iterable<Result<TStore>>, store: TStore): Canceller {
  let cancelled = false;
  (async () => {
    for (const item of value) {
      if (await setImmediateAsync(cancelled)) {
        return;
      }
      handle(item, store);
    }
  })
  return () => {
    cancelled = true;
  }
}
function handleAsyncIterable<TStore extends AnyStore>(value: AsyncIterable<Result<TStore>>, store: TStore): Canceller {
  let cancelled = false;
  (async () => {
    for await (const item of value) {
      if (cancelled) {
        return;
      }
      handle(item, store);
    }
  })
  return () => {
    cancelled = true;
  }
}
function handleStandardAction<TStore extends AnyStore>(value: StandardEventAny, {dispatch}: TStore): Canceller {
  dispatch(value);
  return noop;
}
function handlePromiseLike<TStore extends AnyStore>(value: PromiseLike<Result<TStore>>, store: TStore ): Canceller {
  let cancelled = false;
  const cancel = exec(async (value) => {
    const result = await value;
    if (cancelled) {
      return noop;
    }
    return handle(result, store);
  }, value);
  return () => {
    cancelled = true;
    cancel.then(p => p());
  }
}
type AnyCommandResult = CommandResult<any, any>
function handleGenerator<TState, TEvents extends StandardEventAny>(value: CommandGenerator<TState, TEvents>,store: Store<TState, TEvents>): Canceller{
  const iter = value[Symbol.iterator]();
  // const asf: AsyncGenerator<AnyCommandResult, AnyCommandResult | void, Promise<TState>> = {
  //   next:(state) => setImmediateAsync(iter.next(Promise.resolve(state))),
  //   return:(...args) => setImmediateAsync(iter.return(...args)),
  //   throw:(...args) => setImmediateAsync(iter.throw(...args)),
  //   [Symbol.asyncIterator]() {
  //     return this;
  //   }
  // }
  // return handleAsyncGenerator(asf, store);
  let current: ReturnType<typeof iter.next>;// = iter.next();
  const cancellers: Canceller[] = [];
  do {
    const getState:[TState | undefined] = [undefined];
    current = iter.next(getState);
    if (current.value) {
        cancellers.push(handle(current.value, store));
    }
    getState[0] = store.getState();
  } while(!current.done)

  return () => {
    if (iter.return) {
      const cancelledEvent: StandardEventAny = { type: 'command_cancelled', payload: 'iterator return called.' };
      const current = iter.return(cancelledEvent as any);
      if (current.value) {
        cancellers.push(handle(current.value, store));
      }
    }
    cancellers.forEach(p => p());
  }
}
function handleAsyncGenerator<TState, TEvents extends StandardEventAny>(value: AsyncCommandGenerator<TState, TEvents>,store: Store<TState, TEvents>): Canceller{
  const iter = value[Symbol.asyncIterator]();
  const cancellers: Canceller[] = [];
  (async () => {
  let current: Await<ReturnType<typeof iter.next>>;// = iter.next();
    do {
      const state = defer<TState>();
      current = await iter.next(state.promise);
      if (current.value) {
        cancellers.push(handle(current.value, store));
      }
      state.resolve(store.getState());
    } while (!current.done);
  })();

  return async () => {
    if (iter.return) {
      const current = await iter.return({ type: 'command_cancelled', payload: 'iterator return called.' } as any);
      if (current.value) {
        cancellers.push(handle(current.value, store));
      }
    }
    cancellers.forEach(p => p());
  };
}
function handleObservable<TStore extends AnyStore>(obs: Observable<Result<TStore>>, store: TStore): Canceller {
    const sub = obs.subscribe({onNext: value => handle(value, store)})
    return () => sub.unsubscribe();
}
function handleThunk<TStore extends AnyStore>(thunk: Thunk<Result<TStore>>, store: TStore): Canceller {
  let cancelled = false;
  const cancellers: Canceller[] = [];
  thunk((value) => {
    if (!cancelled) {
      cancellers.push(handle(value, store));
    }
  });
  return () => {
    cancelled = true;
    cancellers.forEach(p => p());
  };
}
