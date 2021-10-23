/* eslint-disable @typescript-eslint/no-namespace */
export interface defer<T = void> {
  readonly [Symbol.toStringTag]: 'defer';
  readonly resolve: (value?: T | PromiseLike<T>) => void;
  readonly reject: (reason?: any) => void;
  readonly promise: Promise<T>;
}
export function defer<T = void>(): defer<T> {

  const result: any = {
    [Symbol.toStringTag]: 'Defer'
  };

  result.promise = new Promise<T>((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });
  return Object.freeze(result);
}
export namespace defer {
  export function resolve(): defer<void>;
  export function resolve<T>(value: T): defer<T>;
  export function resolve(value?: any) {
    const result = defer<any>();
    result.resolve(value);
    return result;
  }
  export function reject<T = never>(reason?: any) {
    const result = defer<T>();
    result.reject(reason);
    return result;
  }
}
