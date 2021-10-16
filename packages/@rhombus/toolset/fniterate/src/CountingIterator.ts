export interface CountingIteratorYieldResult<T> extends IteratorYieldResult<T> {
    index: number;
}
export interface CountingIteratorReturnResult<TReturn> extends IteratorReturnResult<TReturn> {
    count: number;
}

export type CountingIteratorResult<T, TReturn = any> = CountingIteratorYieldResult<T> | CountingIteratorReturnResult<TReturn>;


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class CountingIterator<T> implements IterableIterator<T> {
    private currentIndex = 0;
    [Symbol.iterator]() {
        return this;
    }
    constructor(private readonly _source: Iterator<T>) {
        if (!_source.return) {
            this.return = undefined;
        }
        if (!_source.throw) {
            this.throw = undefined;
        }
    }


    // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
    private makeResult(result: IteratorResult<T>) {
        if (result.done) {
            return { ...result, ...{ count: this.currentIndex } };
        } else {
            return { ...result, ...{ index: this.currentIndex++ } };
        }
    }
    next(...args: []): CountingIteratorResult<T> {
        const result = this._source.next(...args);
        return this.makeResult(result);
    };
    return?(): CountingIteratorResult<T> {
        const result = this._source.return!();
        return this.makeResult(result);

    }
    throw?(e?: any): CountingIteratorResult<T> {
        const result = this._source.throw!(e);
        return this.makeResult(result);
    }
}
