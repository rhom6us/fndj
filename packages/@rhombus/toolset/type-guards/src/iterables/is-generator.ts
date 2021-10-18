import { isIterator } from "./is-iterator";
const GeneratorFunction = (function* () { }()).constructor as GeneratorFunction;

export function isGenerator(value: any): value is Generator<any, any, any> {
  if (value?.constructor === GeneratorFunction)
    return true;
  if (/\bGenerator\b/.test(Object.prototype.toString.call(value)))
    return true;
  return isIterator(value) && value?.next?.length === 1;
}
