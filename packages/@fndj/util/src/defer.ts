import { Func } from '.';

export interface Defer<T> {
    readonly [Symbol.toStringTag]: 'defer';
    readonly promise: Promise<T>;
    readonly resolve: (value: T) => void;
    readonly reject: (reason?: string) => void;

}
export const defer = function <T = void>() {

    const result: any = {
        [Symbol.toStringTag]: 'defer'
    };
    result.promise = new Promise((resolve, reject) => {
        result.resolve = resolve;
        result.reject = reject;
    });
    return Object.freeze(result) as Defer<T>;
};
