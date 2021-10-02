import { CountingIterator } from './CountingIterator';

export interface Grouping<T, TKey> extends Iterable<T> {
    key: TKey;
}
export function first<V>(source: Iterable<V>, predicate?: (this: typeof source, item: V, index: number) => boolean) {
    let index = 0;
    for (const item of source) {
        if (predicate?.call(source, item, index++) ?? true) {
            return item;
        }
    }
    throw new RangeError("Sequence contains no elements");
}

export function firstOrDefault<V, D = undefined>(source: Iterable<V>, defaultValue: D, predicate?: (this: typeof source, item: V, index: number) => boolean): D | V {
    let index = 0;
    for (const item of source) {
        if (predicate?.call(source, item, index++) ?? true) {
            return item;
        }
    }
    return defaultValue;
}
export function* filter<V>(source: Iterable<V>, predicate: (this: typeof source, item: V, index: number) => boolean) {
    let index = 0;
    for (const item of source) {
        if (predicate.call(source, item, index++)) {
            yield item;
        }
    }
}
export function* map<V, R>(source: Iterable<V>, selector: (this: typeof source, item: V, index: number) => R): Iterable<R> {
    let index = 0;
    for (const item of source) {
        yield selector.call(source, item, index++);
    }
}
export function* flatMap<V, R>(source: Iterable<V>, selector: (this: typeof source, item: V, index: number) => Iterable<R>): Iterable<R> {
    let index = 0;
    for (const sublist of source) {
        yield* selector.call(source, sublist, index++);
    }
}
export function skip<V>(source: Iterable<V>, count: number): Iterable<V> {
    const iter = source instanceof CountingIterator ? source : new CountingIterator(source[Symbol.iterator]());
    let current = iter.next();

    while (!current.done && current.index < count++) {
        current = iter.next();
    }
    return iter;

}
export function* iterateCount<V>(source: Iterable<V>) {
    const iter = source instanceof CountingIterator ? source : new CountingIterator(source[Symbol.iterator]());
    let current = iter.next();
    while (!current.done) {
        yield [current.value, current.index];
        current = iter.next();
    }
}
export function* take<V>(source: Iterable<V>, count: number): Iterable<V> {
    for (const [item, index] of iterateCount(source)) {
        if (index >= count) {
            return;
        }
        yield item;
    }
}
