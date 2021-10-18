import { _isIterator } from './_isIterator';
import { isAsyncIterable } from "./is-async-iterable";

export function isAsyncIterator(value: any): value is AsyncIterableIterator<any> {
  return isAsyncIterable(value) && _isIterator(value);
}
