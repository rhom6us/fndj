import { Func } from "@rhombus-toolkit/func";

type NotNull<T> = Exclude<T, null>;
type Cast<T, R> = T extends R ? T : R;
export type InferEventType<T extends EventTarget, N extends string> = Cast<Parameters<Cast<NotNull<T[Cast<`on${N}`, keyof T>]>, Func>>[0], Event>;


export function listenEventAsync<T extends EventTarget, N extends Parameters<T['addEventListener']>[0]>(target: T, name: N, options: Omit<AddEventListenerOptions, 'once'> | boolean = {}) {
    return new Promise<InferEventType<T, N>>(resolve => {
        const opts = typeof options === 'boolean' ? { capture: options } : options;
        target.addEventListener(name, p => resolve(p as any), { ...opts, once: true });
    });
}
