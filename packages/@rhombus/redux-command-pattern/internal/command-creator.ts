import { CommandFnAny, CommandHandler, InferPayload } from './command-fn';
import { StandardCommand } from './standard-command';
import { DeepDictionary, DeepDictionaryItem, Restify, unrestify } from './utils';

export type CommandCreator<TCommandFn extends CommandFnAny> = (...payload: Restify<InferPayload<TCommandFn>>) => StandardCommand<InferPayload<TCommandFn>>;


type CommandCreatorMap<TCommandFnMap extends DeepDictionary<CommandFnAny>> = {
  [K in keyof TCommandFnMap]: CommandCreatorOrMap<TCommandFnMap[K]>;
};
type CommandCreatorOrMap<TCommandFnOrMap extends DeepDictionaryItem<CommandFnAny>> =
  TCommandFnOrMap extends CommandFnAny ? CommandCreator<TCommandFnOrMap> :
  TCommandFnOrMap extends Record<string, any> ? {
    [K in keyof TCommandFnOrMap]: CommandCreatorOrMap<TCommandFnOrMap[K]>;
  } :
  never;

// eslint-disable-next-line @typescript-eslint/no-empty-function
function defaultFn() { }


/**
 * @returns \{[command-name]: (payload) => handler(new StandardCommand(command-name, payload))\}
 */
export const getCommands: <T extends DeepDictionaryItem<CommandFnAny>>(handler: CommandHandler<InferPayload<T>>) => CommandCreatorOrMap<T> =

  function _getCommands<T extends DeepDictionaryItem<CommandFnAny>>(invoker: CommandHandler<InferPayload<T>>, type?: string): CommandCreatorOrMap<T> {
    return new Proxy(defaultFn, {
      get(target, prop) {
        const ns = [type, prop].filter(Boolean).join('.');
        return _getCommands<T>(invoker, ns);
      },
      apply(target, thisArg, payload) {
        if (!type) {
          throw new Error('Cannot invoke the root command map object');
        }
        const cmd: StandardCommand<InferPayload<T>> = {
          type,
          payload: unrestify(payload) as any
        };
        invoker(cmd);
        return cmd;
      },
    }) as CommandCreatorOrMap<T>;
  };
