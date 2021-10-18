import { isFunction } from './is-function';
export function isPromiseLike(value) {
    return value instanceof Promise
        || /\bPromise\b/.test(Object.prototype.toString.call(value))
        || 'then' in value && isFunction(value?.then);
}
//# sourceMappingURL=is-promise.js.map