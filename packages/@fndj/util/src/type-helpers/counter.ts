import { Length, Skip, Tail } from './array';
import { Cast } from './cast';


type CounterArray = never[];
type Next<I extends CounterArray> = [never, ...I];


type Prev<I extends CounterArray> = Tail<I>;

type ExpandArrayToLength<counter extends CounterArray, length extends number> =
    Length<counter> extends length ? counter :
    ExpandArrayToLength<[never, ...counter], length>;

// type _Counter<length extends number, counter extends CounterArray = []> =
//     Length<counter> extends length ? counter :
//     _Counter<length, Next<counter>>;

type _Counter<length extends number> =
    length extends 0 ? [] :
    length extends 1 ? [never] :
    ExpandArrayToLength<[], length>;
type Counter<length extends number> = Cast<_Counter<length>, CounterArray>;

export type Store<value extends number> = Counter<value>;
export type Inc<N extends number> = Length<Next<Counter<N>>>;
export type Dec<N extends number> = Length<Prev<Counter<N>>>;

export type Add<X extends number, Y extends number> =
    Length<[...Counter<X>, ...Counter<Y>]>;

export type Subtract<X extends number, Y extends number> =
    Length<Skip<Y, Counter<X>>>;
