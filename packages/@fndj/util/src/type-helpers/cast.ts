// type Iterator<Index extends number = 0, From extends any[] = [], I extends any[] = []> = {
//     0: Iterator<Index, Next<From>, Next<I>>;
//     1: From;
// }[
//     Pos<I> extends Index
//     ? 1
//     : 0
// ];
export type Cast<Value, Type> = Value extends Type ? Value : Type;
