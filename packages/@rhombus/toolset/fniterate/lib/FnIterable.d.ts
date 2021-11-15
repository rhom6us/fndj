export declare class FnIterable<V> implements Iterable<V> {
    private readonly _source;
    constructor(_source: Iterable<V>);
    static from<V>(source: Iterable<V>): FnIterable<V>;
    [Symbol.iterator](): Iterator<V, any, undefined>;
    first(predicate?: (source: V, index: number) => boolean): V;
    firstOrDefault<D = undefined>(predicate?: (source: V, defaultValue: D, index: number) => boolean): V | ((source: V, defaultValue: D, index: number) => boolean) | undefined;
    filter(predicate: (source: V, index: number) => boolean): Iterable<V>;
    map<R>(selector: (source: V, index: number) => R): FnIterable<R>;
    flatMap<R>(selector: (source: V, index: number) => Iterable<R>): FnIterable<R>;
    take(count: number): FnIterable<V>;
    skip(count: number): FnIterable<V>;
}
//# sourceMappingURL=FnIterable.d.ts.map