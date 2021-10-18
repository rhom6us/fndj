import { isFunction } from '../is-function';

export function _isIterator(value: any): value is Iterator<any> {
  if (value?.[Symbol.toStringTag]?.split(/\s+/)?.includes('Iterator'))
    return true;

  if (/\bIterator\b/.test(Object.prototype.toString.call(value)))
    return true;

  return isFunction(value?.next);
}
