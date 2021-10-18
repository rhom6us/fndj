// export type LegitTuple = [] | [any] | [any, any] | [any, any, any] | [any, any, any, any] | [any, any, any, any, any] | [any, any, any, any, any, any] | [any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any];
// export type Tuple<T1 = void, T2 = void, T3 = void, T4 = void, T5 = void> =
//   T5 extends void ?
//   T4 extends void ?
//   T3 extends void ?
//   T2 extends void ?
//   T1 extends void ? [] :
//   [T1] : [T1, T2] : [T1, T2, T3] : [T1, T2, T3, T4] : [T1, T2, T3, T4, T5];
// export type Tuple<T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void, T7 = void, T8 = void, T9 = void> =
//   T1 extends void ? readonly  [] :
//   T2 extends void ? readonly  [T1] :
//   T3 extends void ? readonly  [T1, T2] :
//   T4 extends void ? readonly  [T1, T2, T3] :
//   T9 extends void ? readonly  [T1, T2, T3, T4] :
//   T9 extends void ? readonly  [T1, T2, T3, T4, T5] :
//   T9 extends void ? readonly  [T1, T2, T3, T4, T5, T6] :
//   T9 extends void ? readonly  [T1, T2, T3, T4, T5, T6, T7] :
//   T9 extends void ? readonly  [T1, T2, T3, T4, T5, T6, T7, T8] :
//   readonly [T1, T2, T3, T4, T5, T6, T7, T8, T9];
// export type TupleX<T extends any[]> =
//   T extends LegitTuple & [] ? [] :
//   T extends LegitTuple & [infer T0] ? [T0] :
//   T extends LegitTuple & [infer T0, infer T1] ? [T0, T1] :
//   T extends LegitTuple & [infer T0, infer T1, infer T2] ? [T0, T1, T2] :
//   T extends LegitTuple & [infer T0, infer T1, infer T2, infer T3, infer T4] ? [T0, T1, T2, T3, T4] :
//   T extends LegitTuple & [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5] ? [T0, T1, T2, T3, T4, T5] :
//   T extends LegitTuple & [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6] ? [T0, T1, T2, T3, T4, T5, T6] :
//   T extends LegitTuple & [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7] ? [T0, T1, T2, T3, T4, T5, T6, T7] :
//   T extends LegitTuple & [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8] ? [T0, T1, T2, T3, T4, T5, T6, T7, T8] :
//   T extends LegitTuple & [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9] ? [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9] :
//   T extends LegitTuple ? T :
//   void;
// export type InferTuple<T extends any[]> =
//   T extends [] ? Tuple :
//   T extends [infer T0] ? Tuple<T0> :
//   T extends [infer T0, infer T1] ? Tuple<T0, T1> :
//   T extends [infer T0, infer T1, infer T2] ? Tuple<T0, T1, T2> :
//   T extends [infer T0, infer T1, infer T2, infer T3, infer T4] ? Tuple<T0, T1, T2, T3, T4> :
//   T extends [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5] ? Tuple<T0, T1, T2, T3, T4, T5> :
//   T extends [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6] ? Tuple<T0, T1, T2, T3, T4, T5, T6> :
//   T extends [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7] ? Tuple<T0, T1, T2, T3, T4, T5, T6, T7> :
//   T extends [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8] ? Tuple<T0, T1, T2, T3, T4, T5, T6, T7, T8> :
//   T extends any[] ? T :
//   void;
// export function tuple<T extends any[]>(legitTuple: T): InferTuple<T>;
// export function tuple<T extends [any[]]>(legitTuple: T): InferTuple<T[0]>;
// export function tuple<T extends any[]>(...items: T): InferTuple<T>;
// export function tuple(...items: any[]) {
//   if (items.length === 1) {
//     if (Array.isArray(items[0])) {
//       return tuple(items[0]);
//     }
//   }
//   if (items.length > 10) {
//     throw new TypeError(
//       "tuple util function only supports tuple length of up to 9"
//     );
//   }
//   return items;
// };
// export function tuple<T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void, T7 = void, T8 = void, T9 = void>(...args:Tuple<T1, T2, T3, T4, T5, T6, T7, T8, T9>){
export function tuple(...args) {
    return args;
}
//# sourceMappingURL=tuple.js.map