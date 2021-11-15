import { isIterable } from './is-iterable';
import { _isIterator } from './_isIterator';
export function isIterator(value) {
    return isIterable(value) && _isIterator(value);
}
//# sourceMappingURL=is-iterator.js.map