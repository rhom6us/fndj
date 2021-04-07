import { CancellablePromise } from './FnPromise';
import { Func } from './func';
import { unrestify, Unrestify } from './restify';
import { setImmediate, clearImmediate } from './set-immediate';



export function setImmediateAsync<T extends any[]>(...args: T): CancellablePromise<Unrestify<T>> {
    let token: number;
    let preject: Func<string>;
    const promise: CancellablePromise<Unrestify<T>> = new Promise<Unrestify<T>>((resolve, reject) => {
        token = setImmediate((...args) => resolve(unrestify(args)), ...args);
        preject = reject;
    }) as any;
    promise.cancel = () => {
        clearImmediate(token);
        preject('cancelled');
    };
    return promise;
}

export function setTimeoutAsync<T extends any[]>(ms: number, ...args: T) {
    let token: number;
    let preject: Func<string>;

    const promise: CancellablePromise<Unrestify<T>> = new Promise<Unrestify<T>>((resolve, reject) => {
        token = setTimeout((...args: T) => resolve(unrestify(args)), ms, ...args);
        preject = reject;
    }) as any;
    promise.cancel = () => {
        clearTimeout(token);
        preject('cancelled');
    };
    return promise;
}
