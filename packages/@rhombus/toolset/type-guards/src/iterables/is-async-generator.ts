import { isAsyncIterator } from "./is-async-iterator";

const AsyncGeneratorFunction = (async function* () { }()).constructor as AsyncGeneratorFunction;
export function isAsyncGenerator(value: any): value is AsyncGenerator<any, any, any> {
  if (value?.constructor === AsyncGeneratorFunction)
    return true;
  if (/\bAsyncGenerator\b/.test(Object.prototype.toString.call(value)))
    return true;
  return isAsyncIterator(value) && value?.next?.length === 1;
}
