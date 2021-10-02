/* eslint-disable @typescript-eslint/ban-types */
import { Fn, Func } from './util';


type SelectorChain<T1, T2, T3, T4> = [Fn<T1, T2>, Fn<T2, T3>, Fn<T3, T4>];



type MakeSelectorChain<Types extends any[]> =
    Types extends [infer Source, ...any] ? _MakeSelectorChain<Source, [], Types> : never;

type _MakeSelectorChain<Source, mapped extends any[], types extends any[]> =
    types extends [] ? never :
    types extends [infer result] ? (source: Iterable<Source>, ...args: mapped) => Iterable<result> :
    types extends [infer pop, infer peek, ...infer rest] ? _MakeSelectorChain<Source, [...mapped, (arg: pop) => peek], [peek, ...rest]> :
    never;

type UnshiftArg<TFn extends (...args: any) => any, newArg> = (...args: [newArg, ...Parameters<TFn>]) => ReturnType<TFn>;
type PushArg<TFn extends (...args: any) => any, newArg> = (...args: [...Parameters<TFn>, newArg]) => ReturnType<TFn>;
type Cast<value, Type> = value extends Type ? value : Type;


type testit_ITWORKS_w00t = MakeSelectorChain<[number, string, boolean, Date]>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// declare const piper: <TSource>(source: Iterable<TSource>) => Iterable<TSource> |
//     (<TSource, TResult1>(source: TSource, selector1: Func<[TSource], TResult1>) => Iterable<TResult1>);
export function pipe<TSource>(source: TSource): Iterable<TSource>;
export function pipe<TSource, TResult1>(source: TSource, selector1: Func<[TSource], TResult1>): TResult1;
export function pipe<TSource, TResult1, TResult2>(source: TSource, selector1: Fn<TSource, TResult1>, selector2: Func<[TResult1], TResult2>): TResult2;
export function pipe<TSource, TResult1, TResult2, TResult3>(source: TSource, selector1: Func<[TSource], TResult1>, selector2: Func<[TResult1], TResult2>, selector3: Func<[TResult2], TResult3>): TResult3;
export function pipe<TSource, TResult1, TResult2, TResult3, TResult4>(source: TSource, selector1: Func<[TSource], TResult1>, selector2: Func<[TResult1], TResult2>, selector3: Func<[TResult2], TResult3>, selector4: Func<[TResult3], TResult4>): TResult4;
export function pipe<TSource, TResult1, TResult2, TResult3, TResult4, TResult5>(source: TSource, selector1: Func<[TSource], TResult1>, selector2: Func<[TResult1], TResult2>, selector3: Func<[TResult2], TResult3>, selector4: Func<[TResult3], TResult4>, selector5: Func<[TResult4], TResult5>): TResult5;
export function pipe<TSource, TResult1, TResult2, TResult3, TResult4, TResult5, TResult6>(source: TSource, selector1: Func<[TSource], TResult1>, selector2: Func<[TResult1], TResult2>, selector3: Func<[TResult2], TResult3>, selector4: Func<[TResult3], TResult4>, selector5: Func<[TResult4], TResult5>, selector6: Func<[TResult5], TResult6>): TResult6;
export function pipe<TSource, TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7>(source: TSource, selector1: Func<[TSource], TResult1>, selector2: Func<[TResult1], TResult2>, selector3: Func<[TResult2], TResult3>, selector4: Func<[TResult3], TResult4>, selector5: Func<[TResult4], TResult5>, selector6: Func<[TResult5], TResult6>, selector7: Func<[TResult6], TResult7>): TResult7;
export function pipe<TSource, TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7, TResult8>(source: TSource, selector1: Func<[TSource], TResult1>, selector2: Func<[TResult1], TResult2>, selector3: Func<[TResult2], TResult3>, selector4: Func<[TResult3], TResult4>, selector5: Func<[TResult4], TResult5>, selector6: Func<[TResult5], TResult6>, selector7: Func<[TResult6], TResult7>, selector8: Func<[TResult7], TResult8>): TResult8;
export function pipe<TSource, TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7, TResult8, TResult9>(source: TSource, selector1: Func<[TSource], TResult1>, selector2: Func<[TResult1], TResult2>, selector3: Func<[TResult2], TResult3>, selector4: Func<[TResult3], TResult4>, selector5: Func<[TResult4], TResult5>, selector6: Func<[TResult5], TResult6>, selector7: Func<[TResult6], TResult7>, selector8: Func<[TResult7], TResult8>, selector9: Func<[TResult8], TResult9>): TResult9;
export function* pipe(source: Iterable<any>, ...selectors: Array<(arg: any) => any>) {
    for (const item of source) {
        yield selectors.reduce((seed, current) => current(seed), item);
    }
}


function pp<TSource, TResult>(source: Iterable<TSource>, op: (source: Iterable<TSource>) => TResult) {
    return op(source);
}

export function filter<TSource>(predicate: (this: Iterable<TSource>, item: TSource) => boolean) {
    return function* (source: Iterable<TSource>) {
        for (const item of source) {
            if (predicate.call(source, item)) {
                yield item;
            }
        }
    };
}
export function map<TSource, TResult>(selector: (this: Iterable<TSource>, item: TSource) => TResult) {
    return function* (source: Iterable<TSource>) {
        for (const item of source) {
            yield selector.call(source, item);
        }
    };
}
export function first<TSource>(predicate?: (item: TSource) => boolean) {
    return function (source: Iterable<TSource>) {
        for (const item of source) {
            if (predicate?.call(source, item) ?? true) {
                return item;
            }
        }
        throw new RangeError("Sequence contains no elements");
    };
}
export function firstOrDefault<TSource>(defaultValue: TSource, predicate?: (item: TSource) => boolean) {
    return function (source: Iterable<TSource>) {
        for (const item of source) {
            if (predicate?.call(source, item) ?? true) {
                return item;
            }
        }
        return defaultValue;
    };
}
export function take<TSource>(count: number) {
    return function* (source: Iterable<TSource>): Iterable<TSource> {
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

export function count<TSource>() {
    return function (source: Iterable<TSource>): number {
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
export function toArray<TSource>() {
    return function (source: Iterable<TSource>): TSource[] {
        return Array.isArray(source) ? source : Array.from(source);
    };
}

function assert(condition: boolean, ...data: any) {
    // eslint-disable-next-line no-console
    console.assert(condition, ...data);
}
export function single<TSource>(predicate?: (this: Iterable<TSource>, item: TSource) => boolean): Func<[Iterable<TSource>], TSource> {
    if (predicate) {
        return src => pipe(src, filter(predicate), single());
    }


    return function (source: Iterable<TSource>): TSource {
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
export function singleOrDefault<TSource>(defaultValue: TSource, predicate?: (item: TSource) => boolean) {
    const singleFn = single<TSource>(predicate);
    return function (source: Iterable<TSource>): TSource {
        try {
            return singleFn(source);
        } catch (ex) {
            if (ex instanceof RangeError) {
                return defaultValue;
            }
            throw ex;
        }
    };
}

const etst = [1, 2, 3];

const result = pp(etst, first());
