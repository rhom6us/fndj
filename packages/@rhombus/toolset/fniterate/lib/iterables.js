import { CountingIterator } from './CountingIterator';
export function first(source, predicate) {
    let index = 0;
    for (const item of source) {
        if (predicate?.call(source, item, index++) ?? true) {
            return item;
        }
    }
    throw new RangeError("Sequence contains no elements");
}
export function firstOrDefault(source, defaultValue, predicate) {
    let index = 0;
    for (const item of source) {
        if (predicate?.call(source, item, index++) ?? true) {
            return item;
        }
    }
    return defaultValue;
}
export function* filter(source, predicate) {
    let index = 0;
    for (const item of source) {
        if (predicate.call(source, item, index++)) {
            yield item;
        }
    }
}
export function* map(source, selector) {
    let index = 0;
    for (const item of source) {
        yield selector.call(source, item, index++);
    }
}
export function* flatMap(source, selector) {
    let index = 0;
    for (const sublist of source) {
        yield* selector.call(source, sublist, index++);
    }
}
export function skip(source, count) {
    const iter = source instanceof CountingIterator ? source : new CountingIterator(source[Symbol.iterator]());
    let current = iter.next();
    while (!current.done && current.index < count++) {
        current = iter.next();
    }
    return iter;
}
export function* iterateCount(source) {
    const iter = source instanceof CountingIterator ? source : new CountingIterator(source[Symbol.iterator]());
    let current = iter.next();
    while (!current.done) {
        yield [current.value, current.index];
        current = iter.next();
    }
}
export function* take(source, count) {
    for (const [item, index] of iterateCount(source)) {
        if (index >= count) {
            return;
        }
        yield item;
    }
}
//# sourceMappingURL=iterables.js.map