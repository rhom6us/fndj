import { isFunction, isString } from 'lodash';
export function isStandardEvent(value) {
    return !isFunction(value) && value.type && isString(value.type);
}
//# sourceMappingURL=standard-event.js.map