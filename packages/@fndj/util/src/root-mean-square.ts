function isArrayTuple(value: any[]): value is [any[]] {
    return value.length == 1 && value[0] instanceof Array;
}
// function assertNumArray(value: any[]): value is number[]{
//     return value.every(p => typeof p === 'number');
// }

export function RMS(...values: number[] | [number[]]): number {

    if (isArrayTuple(values)) {
        return RMS(...values[0]);
    }

    return (values.reduce((seed, current) => seed + current ** 2, 0) / values.length) ** 0.5;
}
