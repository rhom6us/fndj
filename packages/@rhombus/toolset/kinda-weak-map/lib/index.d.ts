export default KindaWeakMap;
export declare class KindaWeakMap<K, V extends object> implements Map<K, V> {
    #private;
    set(key: K, value: V): this;
    delete(key: K): boolean;
    get(key: K): V | undefined;
    has(key: K): boolean;
    clear(): void;
    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
    get size(): number;
    entries(): IterableIterator<[K, V]>;
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    [Symbol.iterator](): IterableIterator<[K, V]>;
    readonly [Symbol.toStringTag]: 'KindaWeakMap';
}
//# sourceMappingURL=index.d.ts.map