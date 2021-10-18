export function groupBy(source, keySelector) {
    const map = new Map();
    const getoradd = (p) => {
        if (!map.has(p)) {
            const arr = [];
            arr.key = p;
            map.set(p, arr);
        }
        return map.get(p);
    };
    for (const item of source) {
        getoradd(keySelector(item)).push(item);
    }
    return [...map.values()];
}
//# sourceMappingURL=array.groupBy.js.map