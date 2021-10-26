
type Mutable<T> = { -readonly [P in keyof T]: T[P] };

export interface defer<T = void> {
  readonly [Symbol.toStringTag]: 'defer';
  readonly resolve: (value: T | PromiseLike<T>) => Promise<T>;
  readonly reject: (reason?: any) => Promise<T>;
  readonly promise: Promise<T>;
}
export function defer<T = void>(): defer<T> {
  const result = {
    [Symbol.toStringTag]: 'defer'
  } as Mutable<defer<T>>;

  result.promise = new Promise<T>((resolve, reject) => {
    result.resolve = (value: T | PromiseLike<T>): Promise<T> => {
      resolve(value);
      return result.promise;
    };
    result.reject = (reason: any): Promise<T> => {
      reject(reason);
      return result.promise;
    };
  });

  return Object.freeze(result);
}


export namespace defer {
  export function resolve(): defer<void>;
  export function resolve<T>(value: T): defer<T>;
  export function resolve(value?: any): any {
    return defer().resolve(value);
  }
  export function reject(reason?: any): defer<void>;
  export function reject<T>(reason?: any): defer<T>;
  export function reject(reason?: any): any {
    return defer().reject(reason);
  }
}
