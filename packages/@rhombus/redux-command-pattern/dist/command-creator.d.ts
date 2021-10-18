import { Restify } from '@rhombus/type-helpers';
import { CommandFnAny, CommandHandler, InferPayload } from './command-fn';
import { StandardCommand } from './standard-command';
import { DeepDictionaryItem } from './utils';
export declare type CommandCreator<TCommandFn extends CommandFnAny> = (...payload: Restify<InferPayload<TCommandFn>>) => StandardCommand<InferPayload<TCommandFn>>;
declare type CommandCreatorOrMap<TCommandFnOrMap extends DeepDictionaryItem<CommandFnAny>> = TCommandFnOrMap extends CommandFnAny ? CommandCreator<TCommandFnOrMap> : TCommandFnOrMap extends Record<string, any> ? {
    [K in keyof TCommandFnOrMap]: CommandCreatorOrMap<TCommandFnOrMap[K]>;
} : never;
/**
 * @returns \{[command-name]: (payload) => handler(new StandardCommand(command-name, payload))\}
 */
export declare const getCommands: <T extends DeepDictionaryItem<CommandFnAny>>(handler: CommandHandler<InferPayload<T>>) => CommandCreatorOrMap<T>;
export {};
