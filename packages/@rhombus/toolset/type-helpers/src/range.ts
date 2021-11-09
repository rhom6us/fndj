
export function* range(length: number, start = 0): Iterable<number> {
    let i = 0
    while (i < length) {
        yield start + i++;
    }
}
export function rangeArray(length: number) {
    return Array.from(new Array(length).keys());
}
