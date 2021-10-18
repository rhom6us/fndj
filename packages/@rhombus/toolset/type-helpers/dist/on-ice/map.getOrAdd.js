export function getOrAdd(map, key, factory) {
    if (!map.has(key)) {
        map.set(key, factory(key));
    }
    return map.get(key);
}
;
//# sourceMappingURL=map.getOrAdd.js.map