export declare type DeepRecord<TKey extends keyof any, TValue> = {
    [P in TKey]: DeepRecordItem<TKey, TValue>;
};
export declare type DeepRecordItem<TKey extends keyof any, TValue> = TValue | DeepRecord<TKey, TValue>;
export declare type Dictionary<T> = Record<string, T>;
export declare type DeepDictionary<T> = DeepRecord<string, T>;
export declare type DeepDictionaryItem<T> = DeepRecordItem<string, T>;
//# sourceMappingURL=deep-record.d.ts.map