import { restify, tuple } from '@rhombus/type-helpers';
import { isFunction, toPairs } from 'lodash';
function join(...args) {
    return args.filter(Boolean).join(".");
}
function isReducer(value) {
    return isFunction(value);
}
const pairs = toPairs;
export function createReducer(reducers) {
    const finalMap = {};
    const stack = toPairs(reducers);
    while (stack.length) {
        const [prefix, mapOrFun] = stack.pop();
        if (isReducer(mapOrFun)) {
            finalMap[prefix] = mapOrFun;
        }
        else {
            pairs(mapOrFun).map(([key, p]) => tuple(join(prefix, key), p)).forEach(p => stack.push(p));
        }
    }
    return function rootReducerfn(state, { type, payload }) {
        if (state === undefined) {
            throw new TypeError('redux-command-pattern does not support undefined state. Please preload with an initial state');
        }
        if (!(type in finalMap)) {
            // eslint-disable-next-line no-console
            console.warn(`reducer not found for action: ${type}`);
            return state;
        }
        return finalMap[type](state, ...restify(payload));
    };
}
//# sourceMappingURL=reducer-fn.js.map