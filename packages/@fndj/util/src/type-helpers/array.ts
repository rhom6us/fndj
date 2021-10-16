import { Cast } from './cast';

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
export type Length<T extends any[]> = Cast<T['length'], number>;


/**
 * Moves Values from the front of the right away to the end of the left.
 *
 * ShiftLeft<[0,1,2],[3,4,5,6],2> => [[0,1,2,3,4],[5,6]]]
 */
type ShiftLeft<left extends any[], right extends any[], count extends number> =
    Length<left> extends count ? [left, right] :
    right extends [] ? [left, right] :
    ShiftLeft<[...left, Head<right>], Tail<right>, count>;




/**
 * SplitArray<[0,1,2,3,4,5,6,7,8], 3> => [[0,1,2],[3,4,5,6,7,8]]
 */
export type SplitArray<array extends any[], count extends number> =
    ShiftLeft<[], array, count>;


/**
 * Slice<[0,1,2,3,4,5,6,7,8], 2, 3> => [2,3,4]
 */
export type Slice<array extends any[], start extends number = 0, length extends number = Length<array>> =
    Take<length, Skip<start, array>>;

/**
 * Take<2, [0,1,2,3,4]> => [0,1]
 */
export type Take<N extends number, T extends any[]> =
    Cast<SplitArray<T, N>[0], T>;

/**
 * Skip<2, [0,1,2,3,4]> => [2,3,4]
 */
export type Skip<N extends number, T extends any[]> =
    Cast<SplitArray<T, N>[1], T>;

/**
 * PartialList<[0,1,2,3]> => [0,1,2,3] | [0,1,2] | [0,1] | [0] | []
 */
export type PartialList<T extends any[]> = T | (
    T extends [...infer R, any] ? PartialList<R> : []
);
