import { obj } from '@rhombus/type-helpers';
import * as yt from './youtube';
export type Youtube = {
    [K in keyof typeof yt]: (args: Parameters<typeof yt[K]>) => () => ReturnType<typeof yt[K]>;
};

function bufferFn<T extends (...args: any[]) => any>(fn: T) {
    return (args: Parameters<T>) => () => fn(...args);
}
export const youtube: Youtube = obj.fromEntries(obj.entries(yt).map(([key, fn]) => [key, bufferFn(fn)] as const));
