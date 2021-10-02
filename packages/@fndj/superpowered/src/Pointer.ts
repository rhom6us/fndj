type OpaqueType<TValue, TUniqueKey = 'opaque-type'> = TValue & { _: TUniqueKey; };

export type Pointer = OpaqueType<number, 'pointer'>;

export function pointer(value: number) {
    return value as Pointer;
}
