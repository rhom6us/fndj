import { isIterator } from "./is-iterator";
const GeneratorFunction = (function* () { }()).constructor;
export function isGenerator(value) {
    if (value?.constructor === GeneratorFunction)
        return true;
    if (/\bGenerator\b/.test(Object.prototype.toString.call(value)))
        return true;
    return isIterator(value) && value?.next?.length === 1;
}
//# sourceMappingURL=is-generator.js.map