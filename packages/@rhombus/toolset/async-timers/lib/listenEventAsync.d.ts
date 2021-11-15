import { Func } from '@rhombus/func';
declare type NotNull<T> = Exclude<T, null>;
declare type Cast<T, R> = T extends R ? T : R;
export declare type InferEventType<T extends EventTarget, N extends string> = Cast<Parameters<Cast<NotNull<T[Cast<`on${N}`, keyof T>]>, Func>>[0], Event>;
export declare function listenEventAsync<T extends EventTarget, N extends Parameters<T['addEventListener']>[0]>(target: T, name: N, options?: Omit<AddEventListenerOptions, 'once'> | boolean): Promise<Cast<Parameters<Cast<Exclude<T[Cast<`on${N}`, keyof T>], null>, Func<any[], any>>>[0], Event>>;
export {};
//# sourceMappingURL=listenEventAsync.d.ts.map