import { Length, Skip, Tail } from './array';
import { Cast } from './cast';
declare type CounterArray = never[];
declare type Next<I extends CounterArray> = [never, ...I];
declare type Prev<I extends CounterArray> = Tail<I>;
declare type ExpandArrayToLength<counter extends CounterArray, length extends number> = Length<counter> extends length ? counter : ExpandArrayToLength<[never, ...counter], length>;
declare type _Counter<length extends number> = length extends 0 ? [] : length extends 1 ? [never] : ExpandArrayToLength<[], length>;
declare type Counter<length extends number> = Cast<_Counter<length>, CounterArray>;
export declare type Store<value extends number> = Counter<value>;
export declare type Inc<N extends number> = Length<Next<Counter<N>>>;
export declare type Dec<N extends number> = Length<Prev<Counter<N>>>;
export declare type Add<X extends number, Y extends number> = Length<[...Counter<X>, ...Counter<Y>]>;
export declare type Subtract<X extends number, Y extends number> = Length<Skip<Y, Counter<X>>>;
export {};
//# sourceMappingURL=counter.alt.d.ts.map