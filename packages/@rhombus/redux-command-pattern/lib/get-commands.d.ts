import { Func } from '@rhombus/func';
import { restify } from '@rhombus/type-helpers';
import { CommandFnAny, CommandHandler, CommandMap, InferPayload as CommandPayload } from './create-command-handler';
import { StandardCommand } from './standard-command';
import { DeepDictionary, DeepDictionaryItem } from './utils';
declare type CommandCreatorMap<T extends DeepDictionary<CommandFnAny>, OverrideReturn = never> = {
    [K in keyof T]: CommandCreatorOrMap<T[K], OverrideReturn>;
};
declare type CommandCreatorOrMap<T extends DeepDictionaryItem<CommandFnAny>, OverrideReturn = never> = T extends CommandFnAny ? Func<[...payload: restify<CommandPayload<T>>], OverrideReturn extends never ? StandardCommand<CommandPayload<T>> : OverrideReturn> : T extends Record<string, any> ? CommandCreatorMap<T, OverrideReturn> : never;
/**
 * This function takes a map of command implementations and returns a maching map
 * of command creator functions.
 *
 * It also optionally accepts an invoker to auto-invoke commands as they are created.
 *
 * @returns \{[command-name]: (payload) => handler(new StandardCommand(command-name, payload))\}
 */
export declare const getCommands: {
    <T extends CommandMap>(): CommandCreatorOrMap<T>;
    <T extends CommandMap>(handler: CommandHandler<T>): CommandCreatorOrMap<T, void>;
};
export {};
//# sourceMappingURL=get-commands.d.ts.map