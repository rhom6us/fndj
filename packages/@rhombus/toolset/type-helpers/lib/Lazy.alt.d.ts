export declare class Lazy<T> {
    private readonly factory;
    private _instance?;
    constructor(factory: () => T);
    get value(): T;
}
//# sourceMappingURL=Lazy.alt.d.ts.map