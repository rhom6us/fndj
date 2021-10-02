import { isFunction } from 'lodash';

export function isIterable(value: any): value is Iterable<any> {
  return Symbol.iterator in value;
}
export function isAsyncIterable(value: any): value is AsyncIterable<any> {
  return Symbol.asyncIterator in value;
}

export function isIterator(value: any): value is Iterator<any> | AsyncIterator<any> {
  return isFunction(value.next) && ['throw', 'return'].filter(p => p in value).every(isFunction);
}

export function isGenerator(value: any): value is Generator<any,any,any> {
  return isIterator(value) && isIterable(value);
}
export function isAsyncGenerator(value: any): value is AsyncGenerator<any,any,any> {
  return isIterator(value) && isAsyncIterable(value);
}
