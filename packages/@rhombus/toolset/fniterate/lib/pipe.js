export function* pipe(source, ...args) {
    // const fn = args.reduce((current, next) => p => next(current(p)), p => p);
    for (let item of source) {
        for (const fn of args) {
            item = fn(item);
        }
        yield item;
    }
}
function op(fn) {
    return fn;
}
export function filter(predicate) {
    return {
        *reduce(seed, current) {
            yield* seed;
            if (predicate?.call(this, current) ?? true) {
                yield current;
            }
        }
    };
    // return op<TSource, TSource>(function* (source) {
    //     for (const item of source) {
    //         if (predicate.call(source, item)) {
    //             yield item;
    //         }
    //     }
    // })
    // return function* (source: Iterable<TSource>) {
    //     for (const item of source) {
    //         if (predicate.call(source, item)) {
    //             yield item;
    //         }
    //     }
    // };
}
export function map(selector) {
    return {
        map: selector
    };
    // return function* (source: Iterable<TSource>) {
    //     for (const item of source) {
    //         yield selector.call(source, item);
    //     }
    // };
}
export function first(predicate) {
    return {
        filter: predicate,
        reduce(a, b) {
            if (predicate?.call(a))
                ;
        }
    };
    // return function (source: Iterable<TSource>) {
    //     for (const item of source) {
    //         if (predicate?.call(source, item) ?? true) {
    //             return item;
    //         }
    //     }
    //     throw new RangeError("Sequence contains no elements");
    // };
}
export function firstOrDefault(defaultValue, predicate) {
    return function (source) {
        for (const item of source) {
            if (predicate?.call(source, item) ?? true) {
                return item;
            }
        }
        return defaultValue;
    };
}
export function take(count) {
    return function* (source) {
        if (Array.isArray(source)) {
            return source.slice(0, count);
        }
        let taken = 0;
        for (const item of source) {
            yield item;
            if (++taken >= count) {
                return;
            }
        }
    };
}
export function count() {
    return function (source) {
        if (Array.isArray(source)) {
            return source.length;
        }
        let count = 0;
        const iter = source[Symbol.iterator]();
        while (!iter.next().done) {
            count++;
        }
        return count;
    };
}
export function toArray() {
    return function (source) {
        return Array.isArray(source) ? source : Array.from(source);
    };
}
function assert(condition, ...data) {
    // eslint-disable-next-line no-console
    console.assert(condition, ...data);
}
export function single(predicate) {
    if (predicate) {
        return src => pipe(src, filter(predicate), single());
    }
    return function (source) {
        ;
        assert(!predicate);
        const iter = source[Symbol.iterator]();
        const first = iter.next();
        if (first.done) {
            throw new RangeError("Sequence contains no elements");
        }
        if (!iter.next().done) {
            throw new RangeError("Sequence contains more than one element");
        }
        return first.value;
    };
}
export function singleOrDefault(defaultValue, predicate) {
    const singleFn = single(predicate);
    return function (source) {
        try {
            return singleFn(source);
        }
        catch (ex) {
            if (ex instanceof RangeError) {
                return defaultValue;
            }
            throw ex;
        }
    };
}
const etst = [1, 2, 3];
const result = pp(etst, first());
//# sourceMappingURL=pipe.js.map