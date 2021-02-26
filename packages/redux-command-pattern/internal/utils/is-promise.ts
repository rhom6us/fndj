import { isFunction } from 'lodash';

export function isPromiseLike(value: any): value is PromiseLike<any> {
  return 'then' in value && isFunction(value.then);
}
export function isPromise(value: any): value is Promise<any>{
  return isPromiseLike(value) && value === Promise.resolve(value);
}
