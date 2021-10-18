import { setImmediateAsync } from '@rhombus/async-timers';
import { assertNever, isAsyncGenerator, isAsyncIterable, isGenerator, isIterable, isPromiseLike } from '@rhombus/type-guards';
import { restify } from '@rhombus/type-helpers';
import { get } from 'lodash';
import { isStandardEvent } from './standard-event';
import { isObservable, isThunk } from './utils';
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
;
const DEFAULT_SIGNAL = Object.freeze({
    aborted: false,
    onabort() { throw 'DEFAULT_SIGNAL cannot be aborted'; },
    addEventListener(type) { },
    dispatchEvent() {
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
export function createCommandHandler(store, implementation) {
    return async function handleCommand({ type, payload }, signal = DEFAULT_SIGNAL) {
        const fn = get(implementation, type);
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
async function handle(result, store, signal) {
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
async function handleStandardEvent(value, { dispatch }) {
    // we do NOT check for abort here because the assumption is that once an event is returned/yielded,
    // that event WILL be processed.
    dispatch(value);
}
async function handleThunk(thunk, store, signal) {
    await setImmediateAsync();
    if (signal.aborted)
        return;
    return new Promise(resolve => {
        thunk(value => resolve(handle(value, store, signal)));
    });
}
async function handlePromiseLike(value, store, signal) {
    await setImmediateAsync();
    if (signal.aborted)
        return;
    return handle(await value, store, signal);
}
async function handleObservable(obs, store, signal) {
    await setImmediateAsync();
    if (signal.aborted)
        return;
    const handler = (value) => handle(value, store, signal);
    const sub = obs.subscribe({ onNext: handler, next: handler });
    signal.addEventListener('abort', ev => sub.unsubscribe());
}
async function handleGenerator(iter, store, signal) {
    await setImmediateAsync();
    if (signal.aborted)
        return;
    let current; // = await iter.next(store.getState());
    do {
        current = await iter.next(store.getState());
        if (current.value) {
            await handle(current.value, store, signal);
        }
    } while (!current.done && !signal.aborted);
}
async function handleIterable(value, store, signal) {
    // we do NOT check for abort here because the assumption is that once an event is returned/yielded,
    // that event WILL be processed. We can't do that here because value might be an array. The value
    // parameter is defenitely not a generator function with 'yield' statements because we checked for
    // that earlier in the general 'handle' function above.
    for await (const item of value) {
        await handle(item, store, signal);
    }
}
//# sourceMappingURL=command-fn.js.map