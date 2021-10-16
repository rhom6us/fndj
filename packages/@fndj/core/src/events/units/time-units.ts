import { Opaque } from './Opaque';

export type Seconds = Opaque<number>;
export const Seconds = (p: number) => p as Seconds;
export type Minutes = Opaque<number>;
export const Minutes = (p: number) => p as Minutes;
