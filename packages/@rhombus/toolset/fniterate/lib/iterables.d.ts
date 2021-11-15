export interface Grouping<T, TKey> extends Iterable<T> {
    key: TKey;
}
export declare function first<V>(source: Iterable<V>, predicate?: (this: typeof source, item: V, index: number) => boolean): V;
export declare function firstOrDefault<V, D = undefined>(source: Iterable<V>, defaultValue: D, predicate?: (this: typeof source, item: V, index: number) => boolean): D | V;
export declare function filter<V>(source: Iterable<V>, predicate: (this: typeof source, item: V, index: number) => boolean): Generator<V, void, unknown>;
export declare function map<V, R>(source: Iterable<V>, selector: (this: typeof source, item: V, index: number) => R): Iterable<R>;
export declare function flatMap<V, R>(source: Iterable<V>, selector: (this: typeof source, item: V, index: number) => Iterable<R>): Iterable<R>;
export declare function skip<V>(source: Iterable<V>, count: number): Iterable<V>;
export declare function iterateCount<V>(source: Iterable<V>): Generator<any[], void, unknown>;
export declare function take<V>(source: Iterable<V>, count: number): Iterable<V>;
//# sourceMappingURL=iterables.d.ts.map