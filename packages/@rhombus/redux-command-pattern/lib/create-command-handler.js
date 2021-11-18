import { assertNever, isAsyncGenerator, isAsyncIterable, isGenerator, isIterable, isPromiseLike } from '@rhombus/type-guards';
import { flattenMap, restify } from '@rhombus/type-helpers';
import { isStandardEvent } from './standard-event';
import { isObservable, isThunk } from './utils';
const DEFAULT_SIGNAL = Object.freeze({
    aborted: false,
    onabort() { throw 'DEFAULT_SIGNAL cannot be aborted'; },
    addEventListener() { },
    dispatchEvent() {
        return false;
    },
    removeEventListener() { }
});
export function createCommandHandler(store, implementation) {
    const flatMap = flattenMap(implementation);
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
async function handle(result, store, signal) {
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
async function handleThunk(thunk, store, signal) {
    return new Promise(resolve => {
        thunk(async (value) => {
            await handle(value, store, signal);
            resolve();
        });
    });
}
async function handlePromiseLike(value, store, signal) {
    return handle(await value, store, signal);
}
async function handleObservable(obs, store, signal) {
    const handler = (value) => handle(value, store, signal);
    const sub = obs.subscribe({ onNext: handler, next: handler });
    signal.addEventListener('abort', () => sub.unsubscribe());
}
async function handleGenerator(iter, store, signal) {
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
//# sourceMappingURL=create-command-handler.js.map