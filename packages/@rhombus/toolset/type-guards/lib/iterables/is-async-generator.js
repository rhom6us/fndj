import { isAsyncIterator } from "./is-async-iterator";
const AsyncGeneratorFunction = (async function* () { }()).constructor;
export function isAsyncGenerator(value) {
    if (value?.constructor === AsyncGeneratorFunction)
        return true;
    if (/\bAsyncGenerator\b/.test(Object.prototype.toString.call(value)))
        return true;
    return isAsyncIterator(value) && value?.next?.length === 1;
}
//# sourceMappingURL=is-async-generator.js.map