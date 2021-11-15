export interface CountingIteratorYieldResult<T> extends IteratorYieldResult<T> {
    index: number;
}
export interface CountingIteratorReturnResult<TReturn> extends IteratorReturnResult<TReturn> {
    count: number;
}
export declare type CountingIteratorResult<T, TReturn = any> = CountingIteratorYieldResult<T> | CountingIteratorReturnResult<TReturn>;
export declare class CountingIterator<T> implements IterableIterator<T> {
    private readonly _source;
    private currentIndex;
    [Symbol.iterator](): this;
    constructor(_source: Iterator<T>);
    private makeResult;
    next(...args: []): CountingIteratorResult<T>;
    return?(): CountingIteratorResult<T>;
    throw?(e?: any): CountingIteratorResult<T>;
}
//# sourceMappingURL=CountingIterator.d.ts.map