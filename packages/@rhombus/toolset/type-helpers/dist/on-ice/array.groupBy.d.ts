export interface IGrouping<TKey, TValue> extends Array<TValue> {
    readonly key: TKey;
}
export declare function groupBy<TSource, TKey>(source: TSource[], keySelector: (src: TSource) => TKey): Array<IGrouping<TKey, TSource>>;
