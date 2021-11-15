import { unrestify } from '@rhombus/type-helpers';
const defaultFn = function () { };
/**
 * This function takes a map of command implementations and returns a maching map
 * of command creator functions.
 *
 * It also optionally accepts an invoker to auto-invoke commands as they are created.
 *
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
            invoker?.(cmd);
            return cmd;
        },
    });
};
//# sourceMappingURL=get-commands.js.map