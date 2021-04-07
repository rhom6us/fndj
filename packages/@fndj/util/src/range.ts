export function* iterate(start: number, length = Infinity): Iterable<number> {
    let i = 0;
    while (i < length) {
        yield i++ + start;
    }
}
export function range(start: number, length: number): number[] {
    return Array.from(iterate(start, length));
}
