import { MusicalInteger } from '.';


export type Signature = readonly [beatsPerBar: MusicalInteger, beatValue: MusicalInteger];

export function Signature(...args:Signature): Signature{
    return Object.freeze(args);
}
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Signature{
    export const COMMON_TIME = Signature(4,4);
    export const DOUBLE_TIME = Signature(2,2)
    export const HALF_TIME = Signature(8, 8)
}
