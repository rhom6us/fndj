export interface Defer<T> {
    readonly [Symbol.toStringTag]: 'Defer';
    readonly resolve: (value?: T | PromiseLike<T>) => void;
    readonly reject: (reason?: any) => void;
    readonly promise: Promise<T>;
}
export declare function defer<T = void>(): Defer<T>;
