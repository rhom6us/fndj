import { isFunction } from './is-function';

export function isPromiseLike(value: any): value is PromiseLike<any> {
  return value instanceof Promise
    || /\bPromise\b/.test(Object.prototype.toString.call(value))
    || 'then' in value && isFunction(value?.then);
}
