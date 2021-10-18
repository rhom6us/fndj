import { setImmediateAsync } from '@rhombus/async-timers';
import { Func } from '@rhombus/func';
import { assertNever, isAsyncGenerator, isAsyncIterable, isGenerator, isIterable, isPromiseLike } from '@rhombus/type-guards';
import { Await, Restify, restify } from '@rhombus/type-helpers';
import { get } from 'lodash';
import { StandardCommand } from './standard-command';
import { isStandardEvent, StandardEventAny } from './standard-event';
import { Dispatch, GetState } from './store';
import { AnyTypeOf, DeepDictionary, DeepDictionaryItem, isObservable, isThunk, Observable, Thunk } from './utils';



type CommandGenerator<TState, TEvent extends StandardEventAny> = Generator<CommandResult<TState, TEvent>, CommandResult<TState, TEvent>|void, TState>;
type AsyncCommandGenerator<TState, TEvent extends StandardEventAny> = AsyncGenerator<CommandResult<TState, TEvent>, CommandResult<TState, TEvent>|void, TState>;

// type CommandIterable<TState, TEvent extends StandardEventAny | void> = Iterable<CommandResult<TState, TEvent>>;
// type AsyncCommandIterable<TState, TEvent extends StandardEventAny | void> = AsyncIterable<CommandResult<TState, TEvent>>;

// type Thunk = Action<[Dispatch]>;
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
type CommandResult<TState, TEvent extends StandardEventAny> = AnyTypeOf<TEvent, TState>;
export type CommandFn<TState, TPayload, TEvents extends StandardEventAny> =
  (state: TState, ...payload: Restify<TPayload>) => CommandResult<TState, TEvents>;// | PromiseLike<CommandResult<TState>>


export type CommandFnAny = CommandFn<any, any, any>;


type CommandFnMap = DeepDictionaryItem<CommandFnAny>;
type InferState<T extends CommandFnMap> = T extends DeepDictionaryItem<CommandFn<infer TState, any, any>>
  ? TState
  : never;
type InferEvents<T extends CommandFnMap> = T extends DeepDictionaryItem<CommandFn<any, any, infer TEvents>>
  ? TEvents
  : never;

export type InferPayload<T extends CommandFnMap> =
  T extends Func<[any, ...infer TPayload], any> ? TPayload :
  // T extends CommandFn<any, infer TPayload, any> ? TPayload :
  T extends DeepDictionary<CommandFnAny> ? {
    [K in keyof T]: InferPayload<T[K]>
  }[keyof T] :
  never;



export type CommandHandler<TPayload> = Func<[StandardCommand<TPayload>, AbortSignal?], Promise<void>>;
export interface Store<TState = any, TEvents extends StandardEventAny = StandardEventAny> {
  dispatch: Dispatch<TEvents>,
  getState: GetState<TState>;
};

export type InferStore<T extends DeepDictionary<CommandFnAny>> = Store<InferState<T>, InferEvents<T>>;
const DEFAULT_SIGNAL: AbortSignal = Object.freeze({
  aborted: false,
  onabort() { throw 'DEFAULT_SIGNAL cannot be aborted'; },
  addEventListener(type: 'abort') { },
  dispatchEvent(): boolean {
    return false;
  },
  removeEventListener() { }
});

/**
 * Accepts a standard-command, looks up its implementation, invokes it, and dispatches the resulting events to the store.
 * @param store
 * @param implementation {[command-name]: (state, payload)=>events}
 * @returns ({command-name, payload}) => canceller
 */
export function createCommandHandler<T extends DeepDictionary<CommandFnAny>>(store: InferStore<T>, implementation: T): CommandHandler<InferPayload<T>> {
  type TState = InferState<T>;
  type TPayload = InferPayload<T>;
  type TEvents = InferEvents<T>;

  return async function handleCommand({ type, payload }, signal: AbortSignal = DEFAULT_SIGNAL) {
    const fn = get(implementation, type) as CommandFn<TState, TPayload, TEvents>;
    if (typeof fn !== 'function') {
      throw new TypeError('Invalid command');
    }
    await setImmediateAsync();
    if (!signal.aborted) {
      const result = fn(store.getState(), ...restify(payload));
      return handle(result, store, signal);
    }

  };
}
type Result<T extends Store> =
  T extends Store<infer TState, infer TEvents> ? CommandResult<TState, TEvents> : never;
async function handle<TState, TEvents extends StandardEventAny>(result: CommandResult<TState, TEvents>, store: Store<TState, TEvents>, signal: AbortSignal): Promise<void> {
  if (!result) {
    return;
  }
  if (isStandardEvent(result)) {
    return handleStandardEvent(result, store);
  }
  if (isThunk(result)) {
    return handleThunk(result, store, signal);
  }
  if (isPromiseLike(result)) {
    return handlePromiseLike(result, store, signal);
  }
  if (isObservable(result)) {
    return handleObservable(result, store, signal);
  }
  if (isGenerator(result) || isAsyncGenerator(result)) { // this MUST happen before the 'isIterable()' check
    return handleGenerator(result, store, signal);
  }
  if (isIterable(result) || isAsyncIterable(result)) {
    return handleIterable(result, store, signal);
  }

  return assertNever(result);
}

async function handleStandardEvent<TStore extends Store<any, any>>(value: StandardEventAny, { dispatch }: TStore) {
  // we do NOT check for abort here because the assumption is that once an event is returned/yielded,
  // that event WILL be processed.
  dispatch(value);
}

async function handleThunk<TStore extends Store<any, any>>(thunk: Thunk<Result<TStore>>, store: TStore, signal: AbortSignal) {
  await setImmediateAsync();
  if (signal.aborted)
    return;

  return new Promise<void>(resolve => {
    thunk(value => resolve(handle(value, store, signal)));
  });
}

async function handlePromiseLike<TStore extends Store<any, any>,>(value: PromiseLike<Result<TStore>>, store: TStore, signal: AbortSignal) {
  await setImmediateAsync();
  if (signal.aborted)
    return;

  return handle(await value, store, signal);
}

async function handleObservable<TStore extends Store<any, any>>(obs: Observable<Result<TStore>>, store: TStore, signal: AbortSignal) {
  await setImmediateAsync();
  if (signal.aborted)
    return;

  const handler = (value: Result<TStore>) => handle(value, store, signal);
  const sub = obs.subscribe({ onNext: handler, next: handler });
  signal.addEventListener('abort', ev => sub.unsubscribe());
}

async function handleGenerator<TState, TEvents extends StandardEventAny>(iter: CommandGenerator<TState, TEvents> | AsyncCommandGenerator<TState, TEvents>, store: Store<TState, TEvents>, signal: AbortSignal): Promise<void> {
  await setImmediateAsync();
  if (signal.aborted)
    return;

  let current: Await<ReturnType<typeof iter.next>>;// = await iter.next(store.getState());
  do {
    current = await iter.next(store.getState());
    if (current.value) {
      await handle(current.value, store, signal);
    }
  } while (!current.done && !signal.aborted);
}

async function handleIterable<TStore extends Store<any, any>>(value: Iterable<Result<TStore>> | AsyncIterable<Result<TStore>>, store: TStore, signal: AbortSignal) {
  // we do NOT check for abort here because the assumption is that once an event is returned/yielded,
  // that event WILL be processed. We can't do that here because value might be an array. The value
  // parameter is defenitely not a generator function with 'yield' statements because we checked for
  // that earlier in the general 'handle' function above.
  for await (const item of value) {
    await handle(item, store, signal);
  }
}
