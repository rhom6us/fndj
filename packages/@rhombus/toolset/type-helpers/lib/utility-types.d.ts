export declare type Simplify<T> = {
    [KeyType in keyof T]: T[KeyType];
};
export declare type Except<ObjectType, KeysType extends keyof ObjectType> = Pick<ObjectType, Exclude<keyof ObjectType, KeysType>>;
export declare type Mutable<BaseType, Keys extends keyof BaseType = keyof BaseType> = Simplify<Except<BaseType, Keys> & {
    -readonly [KeyType in keyof Pick<BaseType, Keys>]: Pick<BaseType, Keys>[KeyType];
}>;
export declare type IfEquals<X, Y, A, B = never> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? A : B;
export declare type WritableKeys<T> = {
    [K in keyof T]: IfEquals<{
        [Q in K]: T[K];
    }, {
        -readonly [Q in K]: T[K];
    }, K>;
}[keyof T];
export declare type ReadonlyKeys<T> = {
    [P in keyof T]-?: IfEquals<{
        [Q in P]: T[P];
    }, {
        -readonly [Q in P]: T[P];
    }, never, P>;
}[keyof T];
export declare type WritablePart<T> = Pick<T, WritableKeys<T>>;
export declare type MakeRequired<T, R extends keyof T> = Simplify<Partial<T> & Required<Pick<T, R>>>;
//# sourceMappingURL=utility-types.d.ts.map