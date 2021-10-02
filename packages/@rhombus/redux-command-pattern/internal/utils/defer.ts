export interface Defer<T> {
  readonly resolve: (value?: T | PromiseLike<T>) => void;
  readonly reject: (reason?: any) => void;
  readonly promise: Promise<T>;
}
export function defer<T = void>(): Defer<T> {
  const result: any = {};
  result.promise = new Promise<T>((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
}
