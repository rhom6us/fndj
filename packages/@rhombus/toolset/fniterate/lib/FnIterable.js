import { CountingIterator } from './CountingIterator';
import { filter, map, flatMap, take, skip, first, firstOrDefault } from './iterables';
export class FnIterable {
    _source;
    constructor(_source) {
        this._source = _source;
    }
    static from(source) {
        return new this(source);
    }
    [Symbol.iterator]() {
        return new CountingIterator(this._source[Symbol.iterator]());
    }
    first(predicate) {
        return first(this, predicate);
    }
    firstOrDefault(predicate) {
        return firstOrDefault(this, predicate);
    }
    filter(predicate) {
        return new FnIterable(filter(this, predicate));
    }
    map(selector) {
        return new FnIterable(map(this, selector));
    }
    flatMap(selector) {
        return new FnIterable(flatMap(this, selector));
    }
    take(count) {
        return new FnIterable(take(this, count));
    }
    skip(count) {
        return new FnIterable(skip(this, count));
    }
}
//# sourceMappingURL=FnIterable.js.map