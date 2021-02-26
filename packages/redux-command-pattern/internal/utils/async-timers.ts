
type WrapRest<T> = T extends any[] ? T : [T];
type UnwrapRest<T extends any[]> = T extends [infer U] ? U : T;
function unwrapRest<T extends any[]>(value: T): UnwrapRest<T>  {
  if (Array.isArray(value) && value.length === 1) {
    return value[0];
  }
  return value as any;
}
export const setImmediateAsync = <TArgs extends any[] = []>(...args: TArgs) => new Promise< UnwrapRest<TArgs>>(resolve => {
  setImmediate(((...args: TArgs) => resolve(unwrapRest(args))) as any, ...args);
});
export const setTimeoutAsync = <TArgs extends any[] = []>(timeout:number, ...args: TArgs) => new Promise<UnwrapRest<TArgs>>(resolve => {
  setTimeout(((...args:TArgs) => resolve(unwrapRest(args))) as any, timeout, ...args);
});
