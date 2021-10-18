import { isIterable } from './is-iterable';
import { _isIterator } from './_isIterator';

export function isIterator(value: any): value is IterableIterator<any> {
  return isIterable(value) && _isIterator(value);
}
