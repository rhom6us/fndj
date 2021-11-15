export declare type Func<Args extends any[] = any[], Return = any> = (...args: Args) => Return;
export declare type AsyncFunc<Args extends any[] = any[], Return = any> = Func<Args, Promise<Awaited<Return>>>;
export declare type Action<Args extends any[] = any[]> = Func<Args, void>;
export declare type AsyncAction<Args extends any[] = any[]> = AsyncFunc<Args, void>;
export declare type Sub<Args extends any[] = any[]> = Action<Args>;
export declare type AsyncSub<Args extends any[] = any[]> = AsyncAction<Args>;
export declare type Ctor<Args extends any[] = any[], Instance = any> = new (...args: Args) => Instance;
export declare type AbstractCtor<Args extends any[] = any[], Instance = any> = abstract new (...args: Args) => Instance;
//# sourceMappingURL=index.d.ts.map