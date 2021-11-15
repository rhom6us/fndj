export declare type keys<T> = keyof T;
export declare function keys<T>(obj: T): keys<T>[];
export declare type entries<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T];
export declare function entries<T>(obj: T): entries<T>[];
export declare type values<T> = T[keyof T];
export declare function values<T>(obj: T): values<T>[];
export declare type fromEntries<TUnion extends readonly [PropertyKey, any]> = {
    [Entry in TUnion as Entry[0]]: Entry[1];
};
export declare function fromEntries<TPair extends readonly [PropertyKey, any]>(entries: TPair[]): fromEntries<TPair>;
declare type MergeTarget<Target, Source> = Source extends Partial<Target> ? Target : Target & Source;
declare type CompileArray<Target, Sources extends any[]> = Sources extends [...infer Rest, infer Source] ? CompileArray<MergeTarget<Target, Source>, Rest> : Sources extends [infer Source] ? MergeTarget<Target, Source> : Sources extends [] ? Target : Target;
export declare function assign<T extends object, A extends any[]>(target: T, ...sources: A): CompileArray<T, A>;
export declare function assignDeep<A extends object, B extends object>(target: A, stuff: B): A & B;
export {};
//# sourceMappingURL=obj.d.ts.map