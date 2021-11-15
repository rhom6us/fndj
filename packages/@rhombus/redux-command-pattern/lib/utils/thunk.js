import { isFunction } from 'lodash';
export function isThunk(value) {
    return isFunction(value) && value.length === 1;
}
//# sourceMappingURL=thunk.js.map