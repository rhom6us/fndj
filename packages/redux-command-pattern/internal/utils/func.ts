export type Func<TArgs = [], TResult = void> = (...args: TArgs extends any[] ? TArgs : [TArgs]) => TResult;
