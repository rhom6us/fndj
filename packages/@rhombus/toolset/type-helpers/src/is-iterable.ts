import { isFunction } from './is-function';

export function isIterable(value: any): value is Iterable<any> {
  return Symbol.iterator in value;
}
export function isAsyncIterable(value: any): value is AsyncIterable<any> {
  return Symbol.asyncIterator in value;
}
function _isIterator(value: any): value is Iterator<any> {
  return isFunction(value?.next) && ['throw', 'return'].filter(p => p in value).every(isFunction);
}
export function isIterator(value: any): value is IterableIterator<any> {
  return isIterable(value) && _isIterator(value);
}
export function isAsyncIterator(value: any): value is AsyncIterableIterator<any> {
  return isAsyncIterable(value) && _isIterator(value);
}

const GeneratorFunction = (function* () { }()).constructor as GeneratorFunction;
export function isGenerator(value: any): value is Generator<any, any, any> {
  if (value?.constructor === GeneratorFunction)
    return true;
  if (/\bGenerator\b/.test(Object.prototype.toString.call(value)))
    return true;
  return isIterator(value) && value?.next?.length === 1;
}

const AsyncGeneratorFunction = (async function* () { }()).constructor as AsyncGeneratorFunction;
export function isAsyncGenerator(value: any): value is AsyncGenerator<any, any, any> {
  if (value?.constructor === AsyncGeneratorFunction)
    return true;
  if (/\bAsyncGenerator\b/.test(Object.prototype.toString.call(value)))
    return true;
  return isAsyncIterator(value) && value?.next?.length === 1;
}
