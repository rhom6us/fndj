import { CancellablePromise } from './FnPromise';
import { Func } from './func';
import { Restify, unrestify, Unrestify } from './restify';
import 'setimmediate';
import { CancellationToken } from '.';

export function setImmediateAsync(cancellationToken = CancellationToken.None): Promise<void> {
    let token: number | undefined;
    return new Promise<void>((resolve, reject) => {
        cancellationToken.register(() => {
            if (token) {
                clearImmediate(token);
                token = undefined;
            }
            reject('cancelled');
        });
        token = setImmediate(() => resolve());
    });

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
