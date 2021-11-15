export function* range(length, start = 0) {
    let i = 0;
    while (i < length) {
        yield start + i++;
    }
}
export function rangeArray(length) {
    return Array.from(new Array(length).keys());
}
//# sourceMappingURL=range.js.map