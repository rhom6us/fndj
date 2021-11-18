import { flattenMap, restify } from '@rhombus/type-helpers';
export function createReducer(reducers) {
    const flatMap = flattenMap(reducers);
    return function rootReducerfn(state, { type, payload }) {
        if (state === undefined) {
            throw new TypeError('redux-command-pattern does not support undefined state. Please preload with an initial state');
        }
        if (!(type in flatMap)) {
            // eslint-disable-next-line no-console
            console.warn(`reducer not found for action: ${type}`);
            return state;
        }
        return flatMap[type](state, ...restify(payload));
    };
}
//# sourceMappingURL=createReducer.js.map