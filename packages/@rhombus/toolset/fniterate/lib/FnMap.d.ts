export declare class FnMap<K, V> extends Map<K, V> {
    static from<K, V>(source: Iterable<[K, V]>): FnMap<K, V>;
    getOrSet(key: K, valueFactory: (this: this, key: K) => V): V | undefined;
    tryGet(key: K): readonly [boolean, V];
    tryAdd(key: K, value: V): boolean;
    tryUpdate(key: K, value: V): boolean;
    add(key: K, value: V): this;
    update(key: K, value: V): this;
}
//# sourceMappingURL=FnMap.d.ts.map