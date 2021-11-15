import { Func } from '@rhombus/func';


type SelectorChain<T1, T2, T3, T4> = [Func<[T1], T2>, Func<[T2], T3>, Func<[T3], T4>];



type MakeSelectorChain<Types extends any[]> =
    Types extends [infer Source, ...any] ? _MakeSelectorChain<Source, [], Types> : never;

type _MakeSelectorChain<Source, mapped extends any[], types extends any[]> =
    types extends [] ? never :
    types extends [infer result] ? mapped : //(source: Iterable<Source>, ...args: mapped) => Iterable<result> :
    types extends [infer pop, infer peek, ...infer rest] ? _MakeSelectorChain<Source, [...mapped, (arg: pop) => peek], [peek, ...rest]> :
    never;





// *** GENERATE THE FOLLOWING OVERLOADS WITH THIS CODE ***
// var nums = nums = Array.from(Array(100).keys());
// nums.map(i => nums.slice(0, i).map(p => `T${p}`)).map(p => `export function pipe<TSource, ${p.join(`, `)}>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, ${p.join(`, `)}]>): Iterable<${p.reverse()[0]}>;`).join('\n')

export function pipe<TSource>(source: Iterable<TSource>): Iterable<TSource>;
export function pipe<TSource, T0>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0]>): Iterable<T0>;
export function pipe<TSource, T0, T1>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1]>): Iterable<T1>;
export function pipe<TSource, T0, T1, T2>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2]>): Iterable<T2>;
export function pipe<TSource, T0, T1, T2, T3>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3]>): Iterable<T3>;
export function pipe<TSource, T0, T1, T2, T3, T4>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4]>): Iterable<T4>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5]>): Iterable<T5>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6]>): Iterable<T6>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7]>): Iterable<T7>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8]>): Iterable<T8>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9]>): Iterable<T9>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>): Iterable<T10>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11]>): Iterable<T11>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12]>): Iterable<T12>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13]>): Iterable<T13>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14]>): Iterable<T14>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15]>): Iterable<T15>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16]>): Iterable<T16>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17]>): Iterable<T17>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18]>): Iterable<T18>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19]>): Iterable<T19>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20]>): Iterable<T20>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21]>): Iterable<T21>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22]>): Iterable<T22>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23]>): Iterable<T23>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24]>): Iterable<T24>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25]>): Iterable<T25>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26]>): Iterable<T26>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27]>): Iterable<T27>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28]>): Iterable<T28>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29]>): Iterable<T29>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30]>): Iterable<T30>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31]>): Iterable<T31>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32]>): Iterable<T32>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33]>): Iterable<T33>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34]>): Iterable<T34>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35]>): Iterable<T35>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36]>): Iterable<T36>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37]>): Iterable<T37>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37, T38>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37, T38]>): Iterable<T38>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37, T38, T39>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37, T38, T39]>): Iterable<T39>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37, T38, T39, T40>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37, T38, T39, T40]>): Iterable<T40>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37, T38, T39, T40, T41>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37, T38, T39, T40, T41]>): Iterable<T41>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37, T38, T39, T40, T41, T42>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37, T38, T39, T40, T41, T42]>): Iterable<T42>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37, T38, T39, T40, T41, T42, T43>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37, T38, T39, T40, T41, T42, T43]>): Iterable<T43>;
export function pipe<TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37, T38, T39, T40, T41, T42, T43, T44>(source: Iterable<TSource>, ...args: MakeSelectorChain<[TSource, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37, T38, T39, T40, T41, T42, T43, T44]>): Iterable<T44>;

export function* pipe(source: Iterable<any>, ...args: Array<(p: any) => any>) {
    // const fn = args.reduce((current, next) => p => next(current(p)), p => p);

    for (let item of source) {
        for (const fn of args) {
            item = fn(item);
        }
        yield item;
    }


}
// export function pipe<TSource>(source: TSource): Iterable<TSource>;
// export function pipe<TSource, T1>(source: TSource, selector1: Func<[TSource], T1>): T1;
// export function pipe<TSource, T1, T2>(source: TSource, selector1: Func<[TSource], T1>, selector2: Func<[T1], T2>): T2;
// export function pipe<TSource, T1, T2, T3>(source: TSource, selector1: Func<[TSource], T1>, selector2: Func<[T1], T2>, selector3: Func<[T2], T3>): T3;
// export function pipe<TSource, T1, T2, T3, T4>(source: TSource, selector1: Func<[TSource], T1>, selector2: Func<[T1], T2>, selector3: Func<[T2], T3>, selector4: Func<[T3], T4>): T4;
// export function pipe<TSource, T1, T2, T3, T4, T5>(source: TSource, selector1: Func<[TSource], T1>, selector2: Func<[T1], T2>, selector3: Func<[T2], T3>, selector4: Func<[T3], T4>, selector5: Func<[T4], T5>): T5;
// export function pipe<TSource, T1, T2, T3, T4, T5, T6>(source: TSource, selector1: Func<[TSource], T1>, selector2: Func<[T1], T2>, selector3: Func<[T2], T3>, selector4: Func<[T3], T4>, selector5: Func<[T4], T5>, selector6: Func<[T5], T6>): T6;
// export function pipe<TSource, T1, T2, T3, T4, T5, T6, T7>(source: TSource, selector1: Func<[TSource], T1>, selector2: Func<[T1], T2>, selector3: Func<[T2], T3>, selector4: Func<[T3], T4>, selector5: Func<[T4], T5>, selector6: Func<[T5], T6>, selector7: Func<[T6], T7>): T7;
// export function pipe<TSource, T1, T2, T3, T4, T5, T6, T7, T8>(source: TSource, selector1: Func<[TSource], T1>, selector2: Func<[T1], T2>, selector3: Func<[T2], T3>, selector4: Func<[T3], T4>, selector5: Func<[T4], T5>, selector6: Func<[T5], T6>, selector7: Func<[T6], T7>, selector8: Func<[T7], T8>): T8;
// export function pipe<TSource, T1, T2, T3, T4, T5, T6, T7, T8, T9>(source: TSource, selector1: Func<[TSource], T1>, selector2: Func<[T1], T2>, selector3: Func<[T2], T3>, selector4: Func<[T3], T4>, selector5: Func<[T4], T5>, selector6: Func<[T5], T6>, selector7: Func<[T6], T7>, selector8: Func<[T7], T8>, selector9: Func<[T8], T9>): T9;
// export function* pipe(source: Iterable<any>, ...selectors: Array<(arg: any) => any>) {
//     for (const item of source) {
//         yield selectors.reduce((seed, current) => current(seed), item);
//     }
// }
interface Operator<T, R = Iterable<T>> {

    map?: (this: Iterable<T>, p: T) => R;
    reduce?: (this: Iterable<T>, seed: R, current: T) => R;

}

function op<T, R>(fn: (source: Iterable<T>) => Iterable<R>) {
    return fn;
}

export function filter<TSource>(predicate: (this: Iterable<TSource>, item: TSource) => boolean): Operator<TSource> {
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
export function map<TSource, TResult>(selector: (this: Iterable<TSource>, item: TSource) => TResult): Operator<TSource, TResult> {
    return {
        map: selector
    };
    // return function* (source: Iterable<TSource>) {
    //     for (const item of source) {
    //         yield selector.call(source, item);
    //     }
    // };
}

type reducer<accumulator = any, current = any> = (a: accumulator, b: current) => accumulator;
type transducer<TSource, TResult> = <A>(reducer: reducer<TSource, A>) => reducer<A, TResult>;
type Transducer<TSource, A, TResult> = (reducer: reducer<TSource, A>) => reducer<A, TResult>;
type transform<a = any, b = any> = Func<[a], b>;
type map<a, b, step> = (transform: transform<a, b>) => (reducer: reducer<step, b>) => reducer;
type map1 = (transform: transform) => (reducer: reducer) => reducer;
type map2<a, b, step> = Func<[Func<[Func<[a], b>], step>], reducer>;//  (a => b) => step => reducer

const mmap = <TSource, TResult>(selector: Func<[TSource], TResult>) => <A>(step: reducer<A, TResult>): reducer<A, TSource> => (a, c) => step(a, selector(c));

const mapy: transducer<number, string> = (selector: Func<[number], string>) => <A>(step: reducer<A, string>): reducer<A, number> => (a, c) => step(a, selector(c));
const mapxy: Transducer<number, string, number> = (selector: Func<[number], number>) => (step: reducer<string, number>): reducer<string, number> => (a, c) => step(a, selector(c));
const mapxys: Transducer<number, string, number> = (selector) => (step) => (a: string, c: number) => step(a, selector(c)) as reducer<string, number>;

export function first<TSource>(predicate?: (item: TSource) => boolean): Operator<TSource> {
    return {
        filter: predicate,
        reduce(a, b) {
            if (predicate?.call(a))
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

export const firstOrDefault = <TSource>(defaultValue: TSource, predicate?: (item: TSource) => boolean) => (source: Iterable<TSource>) => {
    for (const item of source) {
        if (predicate?.call(source, item) ?? true) {
            return item;
        }
    }
    return defaultValue;
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
