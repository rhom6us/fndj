
export type Func<Args extends any[], Return = void> = (...args: Args) => Return;


export type Fn<T = void, Q = never> =
    (...args:
        Q extends never ? [] :
        T extends any[] ? T :
        [T]) => Q extends never ? T : Q;


export type AsyncFunc<Args extends any[], Return = void> = (...args: Args) => PromiseLike<Return>;
