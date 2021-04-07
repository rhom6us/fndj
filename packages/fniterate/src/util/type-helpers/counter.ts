import { Length, Tail } from './array';

type Next<I extends any[]> = [never, ...I];


type Prev<I extends any[]> =
    Tail<I>;

type Counter<N extends number = 0, I extends any[] = []> =
    Length<I> extends N ? I :
    Counter<N, Next<I>>;
// type Iterator<Index extends number = 0, From extends any[] = [], I extends any[] = []> = {
//     0: Iterator<Index, Next<From>, Next<I>>;
//     1: From;
// }[
//     Pos<I> extends Index
//     ? 1
//     : 0
// ];
type Cast<Value, Type> = Value extends Type ? Value : Type;
export type Inc<N extends number> = Cast<Length<Next<Counter<N>>>, number>;
export type Dec<N extends number> = Cast<Length<Tail<Counter<N>>>, number>;
