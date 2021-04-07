
/**
 * the first element
 */
export type Head<T extends any[]> =
    T extends [infer R, ...any] ? R : never;
/**
 * all but the first element
 */
export type Tail<T extends any[]> =
    T extends [any, ...infer R] ? R : never;

/**
 * all but the last element
 */;
export type Body<T extends any[]> =
    T extends [...infer R, any] ? R : never;
/**
 * the last element
 */
export type Last<T extends any[]> =
    T extends [...any, infer R] ? R : never;


/**
 * the length of the list
 */
export type Length<T extends any[]> = T['length'];

/**
 * SplitArray<[0,1,2,3,4,5,6], 3> => [[0,1,2],[3,4,5,6]]
 */
type SplitArray<TRight extends any[], N extends number, TLeft extends any[] = []> =
    Length<TLeft> extends N ? [TLeft, TRight] :
    TRight extends [] ? [TLeft, TRight] :
    SplitArray<Tail<TRight>, N, [...TLeft, Head<TRight>]>;

/**
 * Take<2, [0,1,2,3,4]> => [0,1]
 */
export type Take<N extends number, T extends any[]> =
    SplitArray<T, N>[0];
/**
 * Drop<2, [0,1,2,3,4]> => [2,3,4]
 */
export type Drop<N extends number, T extends any[]> =
    SplitArray<T, N>[1];

/**
 * PartialList<[0,1,2,3]> => [0,1,2,3] | [0,1,2] | [0,1] | [0] | []
 */
export type PartialList<T extends any[]> = T | (
    T extends [...infer R, any] ? PartialList<R> : []
);
