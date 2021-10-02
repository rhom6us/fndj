

export type FftSize = 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384 | 32768;

// type IsGreaterThan<T, N> =
//     T extends

export function fftSize(value: number): value is FftSize {
    const root = Math.log2(value);
    return Math.floor(root) == root && 5 <= root && root <= 15;
}
