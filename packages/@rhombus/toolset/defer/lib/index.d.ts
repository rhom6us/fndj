export interface defer<T = void> {
    readonly [Symbol.toStringTag]: 'defer';
    readonly resolve: (value: T | PromiseLike<T>) => Promise<T>;
    readonly reject: (reason?: any) => Promise<T>;
    readonly promise: Promise<T>;
}
export declare function defer<T = void>(): defer<T>;
export declare namespace defer {
    function resolve(): defer<void>;
    function resolve<T>(value: T): defer<T>;
    function reject(reason?: any): defer<void>;
    function reject<T>(reason?: any): defer<T>;
}
//# sourceMappingURL=index.d.ts.map