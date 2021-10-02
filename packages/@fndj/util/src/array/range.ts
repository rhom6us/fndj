
export function range(length: number, start = 0): number[] {
    return Array.from(new Array(length).keys()).map(p => p + start);
}
