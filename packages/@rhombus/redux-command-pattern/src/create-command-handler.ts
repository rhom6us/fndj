/**
 *
 * Accepts a standard-command, looks up its implementation, invokes it, and handlees the resulting events to the store.
 * @param store
 * @param implementation {[command-name]: (state, payload)=>events}
 * @returns This is like a reducer for command objects
 */
import { AsyncAction, Func } from '@rhombus/func';
import { assertNever, isAsyncGenerator, isAsyncIterable, isGenerator, isIterable, isPromiseLike } from '@rhombus/type-guards';
import { Await, restify } from '@rhombus/type-helpers';
import { StandardCommand } from './standard-command';
import { isStandardEvent, StandardEventAny } from './standard-event';
import { Store } from './store';
import { AnyTypeOf, DeepDictionary, DeepDictionaryItem, flattenMap, isObservable, isThunk, Observable, Thunk } from './utils';


export type CommandFn<TState, TPayload, TEvents extends StandardEventAny> =
  (state: TState, ...payload: restify<TPayload>) => CommandResult<TState, TEvents>;// | PromiseLike<CommandResult<TState>>


export type CommandFnAny = CommandFn<any, any, any>;

export type CommandGenerator<TState, TEvent extends StandardEventAny=StandardEventAny> = Generator<CommandResult<TState, TEvent>, CommandResult<TState, TEvent> | void, TState>;
export type AsyncCommandGenerator<TState, TEvent extends StandardEventAny=StandardEventAny> = AsyncGenerator<CommandResult<TState, TEvent>, CommandResult<TState, TEvent> | void, TState>;
export type CommandResult<TState = any, TEvent extends StandardEventAny = StandardEventAny> = AnyTypeOf<TEvent, TState>;


export type CommandMap<S = any, P = any, E extends StandardEventAny = StandardEventAny> = DeepDictionary<CommandFn<S, P, E>>;
export type CommandFnOrMap = DeepDictionaryItem<CommandFnAny>;
type InferState<T extends CommandFnOrMap> = T extends DeepDictionaryItem<CommandFn<infer TState, any, any>>
  ? TState
  : never;
type InferEvents<T extends CommandFnOrMap> = T extends DeepDictionaryItem<CommandFn<any, any, infer TEvents>>
  ? TEvents
  : never;

export type InferPayload<T extends CommandFnOrMap> =
  T extends Func<[any, ...infer TPayload], any> ? TPayload :
  // T extends CommandFn<any, infer TPayload, any> ? TPayload :
  T extends DeepDictionary<CommandFnAny> ? {
    [K in keyof T]: InferPayload<T[K]>
  }[keyof T] :
  never;





export type InferStore<T extends DeepDictionaryItem<CommandFnAny>> = Store<InferState<T>, InferEvents<T>>;

const DEFAULT_SIGNAL: AbortSignal = Object.freeze({
  aborted: false,
  onabort() { throw 'DEFAULT_SIGNAL cannot be aborted'; },
  addEventListener() { },
  dispatchEvent(): boolean {
    return false;
  },
  removeEventListener() { }
});

export type CommandHandler<T extends DeepDictionaryItem<CommandFnAny>> = AsyncAction<[commandObject: StandardCommand<InferPayload<T>>, signal?: AbortSignal]>;

export function createCommandHandler<T extends DeepDictionary<CommandFnAny>>(store: Store, implementation: T): CommandHandler<T> {
  const flatMap: any = flattenMap(implementation);
  return function handleCommand({ type, payload }, signal = DEFAULT_SIGNAL) {

    if (!(type in flatMap)) {
      return Promise.reject(`Command "${type}" not found`);
    }
    if (signal.aborted) {
      return Promise.reject('cancelled');
    }
    const events = flatMap[type](store.getState(), ...restify(payload));
    return handle(events, store, signal);

  };
}
async function handle(result: CommandResult, store: Store, signal: AbortSignal): Promise<void> {
  // await setImmediateAsync();
  if (!result) {
    return;
  }
  if (isStandardEvent(result)) {
    store.dispatch(result);
    return;
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


async function handleThunk(thunk: Thunk<CommandResult<any, StandardEventAny>>, store: Store, signal: AbortSignal) {
  return new Promise<void>(resolve => {
    thunk(async (value) => {
      await handle(value, store, signal);
      resolve();
    });
  });
}

async function handlePromiseLike(value: PromiseLike<CommandResult<any, any>>, store: Store, signal: AbortSignal) {
  return handle(await value, store, signal);
}

async function handleObservable(obs: Observable<CommandResult<any, any>>, store: Store, signal: AbortSignal) {
  const handler = (value: CommandResult<any, any>) => handle(value, store, signal);
  const sub = obs.subscribe({ onNext: handler, next: handler });
  signal.addEventListener('abort', () => sub.unsubscribe());
}

async function handleGenerator(iter: CommandGenerator<any, any> | AsyncCommandGenerator<any, any>, store: Store, signal: AbortSignal): Promise<void> {
  let current: Await<ReturnType<typeof iter.next>>;// = await iter.next(store.getState());
  do {
    current = await iter.next(store.getState());
    if (current.value) {
      await handle(current.value, store, signal);
    }
  } while (!current.done && !signal.aborted);
}

async function handleIterable(value: Iterable<CommandResult<any, any>> | AsyncIterable<CommandResult<any, any>>, store: Store, signal: AbortSignal) {
  // we do NOT check for abort here because the assumption is that once an event is returned/yielded,
  // that event WILL be processed. We can't do that here because value might be an array. The value
  // parameter is defenitely not a generator function with 'yield' statements because we checked for
  // that earlier in the general 'handle' function above.
  for await (const item of value) {
    await handle(item, store, signal);
  }
}
