
export type Integer<Max extends number> = _Integer<Max>;

export type _Integer<Count extends number, Current extends number = never, Acc extends never[] = []> =
    Acc['length'] extends Count ? Current :
    _Integer<Count, Current | Acc['length'], [...Acc, never]>;


export type MusicalInteger = Exclude<Integer<17>, 0>;
export const MusicalInteger = (p: number) => {
    if (0 >= p || p > 16) throw new RangeError('MusicalInteger must be between 1 and 16');
    if (p % 1 !== 0) throw new RangeError('MusicalInteger must be an integer');
    return p as MusicalInteger;
};
