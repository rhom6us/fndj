import { setImmediate, clearImmediate } from './set-immediate';
export interface CancellablePromise<T> extends Promise<T> {
    cancel(): void;
}
export function setImmediateAsync(): CancellablePromise<any> {
    let token: number | undefined;
    const promise = new Promise((resolve) => {
        token = setImmediate(resolve, undefined);
    });
    const cancel = function () {
        if (token)
            clearImmediate(token);
    };
    return { ...promise, cancel };
}

export function setTimeoutAsync<T = void>(ms: number) {
    let token: number;
    const promise: CancellablePromise<T> = new Promise<T>((resolve) => {
        token = setTimeout(resolve, ms);
    }) as any;
    promise.cancel = () => clearTimeout(token);
    return promise;
}
