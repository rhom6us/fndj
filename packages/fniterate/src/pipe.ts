
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
