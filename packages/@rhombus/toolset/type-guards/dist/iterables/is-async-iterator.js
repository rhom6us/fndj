import { _isIterator } from './_isIterator';
import { isAsyncIterable } from "./is-async-iterable";
export function isAsyncIterator(value) {
    return isAsyncIterable(value) && _isIterator(value);
}
//# sourceMappingURL=is-async-iterator.js.map