export interface Defer<T> {
  readonly [Symbol.toStringTag]: 'Defer';
  readonly resolve: (value?: T | PromiseLike<T>) => void;
  readonly reject: (reason?: any) => void;
  readonly promise: Promise<T>;
}
export function defer<T = void>(): Defer<T> {

  const result: any = {
    [Symbol.toStringTag]: 'Defer'
  };

  result.promise = new Promise<T>((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });
  return Object.freeze(result);
}
