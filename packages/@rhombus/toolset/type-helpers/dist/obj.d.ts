export declare function keys<T>(obj: T): Array<keyof T>;
export declare function entries<T>(obj: T): Array<readonly [keyof T, T[keyof T]]>;
export declare function values<T>(obj: T): Array<T[keyof T]>;
declare type MergeTarget<Target, Source> = Source extends Partial<Target> ? Target : Target & Source;
declare type CompileArray<Target, Sources extends any[]> = Sources extends [...infer Rest, infer Source] ? CompileArray<MergeTarget<Target, Source>, Rest> : Sources extends [infer Source] ? MergeTarget<Target, Source> : Sources extends [] ? Target : Target;
export declare function assign<T extends object, A extends any[]>(target: T, ...sources: A): CompileArray<T, A>;
export {};
