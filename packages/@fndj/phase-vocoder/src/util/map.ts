
export function getOrAdd<K, V>(map: Map<K, V>, key: K, factory: (key: K) => V) {
    if (!map.has(key)) {
        map.set(key, factory(key));
    }
    return map.get(key);
};
