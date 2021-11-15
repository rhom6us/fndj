// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class CountingIterator {
    _source;
    currentIndex = 0;
    [Symbol.iterator]() {
        return this;
    }
    constructor(_source) {
        this._source = _source;
        if (!_source.return) {
            this.return = undefined;
        }
        if (!_source.throw) {
            this.throw = undefined;
        }
    }
    // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
    makeResult(result) {
        if (result.done) {
            return { ...result, ...{ count: this.currentIndex } };
        }
        else {
            return { ...result, ...{ index: this.currentIndex++ } };
        }
    }
    next(...args) {
        const result = this._source.next(...args);
        return this.makeResult(result);
    }
    ;
    return() {
        const result = this._source.return();
        return this.makeResult(result);
    }
    throw(e) {
        const result = this._source.throw(e);
        return this.makeResult(result);
    }
}
//# sourceMappingURL=CountingIterator.js.map