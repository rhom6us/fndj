import { unrestify } from '@rhombus/type-helpers';
export function getEventCreator(reducers, prefix = []) {
    const result = {};
    if (typeof reducers === 'function') {
        const [argNames] = /(?<=^\w+\()((?:\w+,)*\w+,?)(?=\))/.exec(reducers.toString().replace(/[\r\n\s]+/g, '').replace(/^function(?=\w)/, ''));
        const [, ...payloadArgNames] = argNames.split(/,\s*/);
        return function (...args) {
            return {
                type: `${prefix.join('.')}`,
                payload: unrestify(args),
            };
        };
        // we do it this way so that the redux devtools 'dispatch' feature can read the argument names
        // return new Function(...payloadArgNames, `
        //     return {
        //       type: '${prefix.join('.')}',
        //       payload: (${unrestify.toString()})(Array.from(arguments))
        //   };`) as any;
    }
    for (const key in reducers) {
        result[key] = getEventCreator(reducers[key], [...prefix, key]);
    }
    return result;
}
//# sourceMappingURL=event-creator.js.map