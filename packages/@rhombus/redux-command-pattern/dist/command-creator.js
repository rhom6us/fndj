import { unrestify } from '@rhombus/type-helpers';
// eslint-disable-next-line @typescript-eslint/no-empty-function
function defaultFn() { }
/**
 * @returns \{[command-name]: (payload) => handler(new StandardCommand(command-name, payload))\}
 */
export const getCommands = function _getCommands(invoker, type) {
    return new Proxy(defaultFn, {
        get(target, prop) {
            const ns = [type, prop].filter(Boolean).join('.');
            return _getCommands(invoker, ns);
        },
        apply(target, thisArg, payload) {
            if (!type) {
                throw new Error('Cannot invoke the root command map object');
            }
            const cmd = {
                type,
                payload: unrestify(payload)
            };
            invoker(cmd);
            return cmd;
        },
    });
};
//# sourceMappingURL=command-creator.js.map