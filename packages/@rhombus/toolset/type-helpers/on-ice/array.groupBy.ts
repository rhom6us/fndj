export interface IGrouping<TKey, TValue> extends Array<TValue> {
    readonly key: TKey;
}
export function groupBy<TSource, TKey>(source: TSource[], keySelector: (src: TSource) => TKey): Array<IGrouping<TKey, TSource>> {
    const map = new Map<TKey, IGrouping<TKey, TSource>>();
    const getoradd = (p: TKey) => {
        if (!map.has(p)) {
            const arr = [] as any;
            arr.key = p;
            map.set(p, arr);
        }
        return map.get(p)!;
    };
    for (const item of source) {

        getoradd(keySelector(item)).push(item);
    }
    return [...map.values()];
}
