import { Func } from './func';

export function pipe<TSource>(source: Iterable<TSource>): Iterable<TSource>;
export function pipe<TSource, TResult1>(source: Iterable<TSource>, selector1: Func<TSource, TResult1>): Iterable<TResult1>;
export function pipe<TSource, TResult1, TResult2>(source: Iterable<TSource>, selector1: Func<TSource, TResult1>, selector2: Func<TResult1, TResult2>): Iterable<TResult2>;
export function pipe<TSource, TResult1, TResult2, TResult3>(source: Iterable<TSource>, selector1: Func<TSource, TResult1>, selector2: Func<TResult1, TResult2>, selector3: Func<TResult2, TResult3>): Iterable<TResult3>;
export function pipe<TSource, TResult1, TResult2, TResult3, TResult4>(source: Iterable<TSource>, selector1: Func<TSource, TResult1>, selector2: Func<TResult1, TResult2>, selector3: Func<TResult2, TResult3>, selector4: Func<TResult3, TResult4>): Iterable<TResult4>;
export function pipe<TSource, TResult1, TResult2, TResult3, TResult4, TResult5>(source: Iterable<TSource>, selector1: Func<TSource, TResult1>, selector2: Func<TResult1, TResult2>, selector3: Func<TResult2, TResult3>, selector4: Func<TResult3, TResult4>, selector5: Func<TResult4, TResult5>): Iterable<TResult5>;
export function pipe<TSource, TResult1, TResult2, TResult3, TResult4, TResult5, TResult6>(source: Iterable<TSource>, selector1: Func<TSource, TResult1>, selector2: Func<TResult1, TResult2>, selector3: Func<TResult2, TResult3>, selector4: Func<TResult3, TResult4>, selector5: Func<TResult4, TResult5>, selector6: Func<TResult5, TResult6>): Iterable<TResult6>;
export function pipe<TSource, TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7>(source: Iterable<TSource>, selector1: Func<TSource, TResult1>, selector2: Func<TResult1, TResult2>, selector3: Func<TResult2, TResult3>, selector4: Func<TResult3, TResult4>, selector5: Func<TResult4, TResult5>, selector6: Func<TResult5, TResult6>, selector7: Func<TResult6, TResult7>): Iterable<TResult7>;
export function pipe<TSource, TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7, TResult8>(source: Iterable<TSource>, selector1: Func<TSource, TResult1>, selector2: Func<TResult1, TResult2>, selector3: Func<TResult2, TResult3>, selector4: Func<TResult3, TResult4>, selector5: Func<TResult4, TResult5>, selector6: Func<TResult5, TResult6>, selector7: Func<TResult6, TResult7>, selector8: Func<TResult7, TResult8>): Iterable<TResult8>;
export function pipe<TSource, TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7, TResult8, TResult9>(source: Iterable<TSource>, selector1: Func<TSource, TResult1>, selector2: Func<TResult1, TResult2>, selector3: Func<TResult2, TResult3>, selector4: Func<TResult3, TResult4>, selector5: Func<TResult4, TResult5>, selector6: Func<TResult5, TResult6>, selector7: Func<TResult6, TResult7>, selector8: Func<TResult7, TResult8>, selector9: Func<TResult8, TResult9>): Iterable<TResult9>;
export function* pipe(source: Iterable<any>, ...selectors: Array<(arg: any) => any>) {
    for (const item of source) {
        yield selectors.reduce((seed, current) => current(seed), item);
    }
}



export function* iterate(start: number, length = Infinity): Iterable<number> {
    let i = 0;
    while (i < length) {
        yield i++ + start;
    }
}

export function* filter<TSource>(source: Iterable<TSource>, predicate: (source: TSource) => boolean): Iterable<TSource> {
    for (const item of source) {
        if (predicate(item)) {
            yield item;
        }
    }
}
export function* map<TSource, TResult>(source: Iterable<TSource>, selector: (source: TSource) => TResult): Iterable<TResult> {
    for (const item of source) {
        yield selector(item);
    }
}
export function* flatMap<TSource, TResult>(source: Iterable<Iterable<TSource>>, selector: (source: TSource) => TResult): Iterable<TResult> {
    for (const sublist of source) {
        for (const item of sublist) {
            yield selector(item);
        }
    }
}
export function* take<TSource>(source: Iterable<TSource>, count: number) {
    let i = 0;
    for (const item of source) {
        if (i++ >= count) {
            break;
        }
        yield item;
    }
}

interface Grouping<T, TKey> extends Iterable<T> {
    key: TKey;
}


// export function groupBy<TSource, TKey>(source: Iterable<TSource>, keySelector: (item: TSource) => TKey): Array<Grouping<TSource, TKey>> {
//     const keys: Generator<Grouping<TSource, TKey>>[] = [];
//     for (const item of source) {
//         const key = keySelector(item);

//     }
//     throw 'asdf';
// }
