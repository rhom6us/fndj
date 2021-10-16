import { CountingIterator } from './CountingIterator';
import { filter, map, flatMap, take, skip, first, firstOrDefault } from './iterables';


export class FnIterable<V> implements Iterable<V> {

    constructor(private readonly _source: Iterable<V>) { }
    static from<V>(source: Iterable<V>) {
        return new this<V>(source);
    }
    [Symbol.iterator](): Iterator<V, any, undefined> {
        return new CountingIterator(this._source[Symbol.iterator]());
    }

    first(predicate?: (source: V, index: number) => boolean): V {
        return first(this, predicate);
    }
    firstOrDefault<D = undefined>(predicate?: (source: V, defaultValue: D, index: number) => boolean) {
        return firstOrDefault(this, predicate);
    }
    filter(predicate: (source: V, index: number) => boolean): Iterable<V> {
        return new FnIterable(filter(this, predicate));
    }
    map<R>(selector: (source: V, index: number) => R) {
        return new FnIterable(map(this, selector));
    }
    flatMap<R>(selector: (source: V, index: number) => Iterable<R>) {
        return new FnIterable(flatMap(this, selector));
    }

    take(count: number) {
        return new FnIterable(take(this, count));
    }
    skip(count: number) {
        return new FnIterable(skip(this, count));
    }




}
