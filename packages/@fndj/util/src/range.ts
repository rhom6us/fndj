export function range(start: number, length: number) {
    return new Array(Math.round(length)).fill(0).map((_, i) => i + Math.round(start));
}
