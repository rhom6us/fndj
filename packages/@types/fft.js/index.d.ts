
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ComplexArray extends Array<number> { }
interface FFT {
    size: number;
    table: any[];
    fromComplexArray(timeComplexBuffer: ComplexArray, output: Float32Array): void;
    createComplexArray(): ComplexArray;
    toComplexArray(input: any, storage: any): any;
    completeSpectrum(freqComplexBufferShifted: ComplexArray): void;
    transform(out: any, data: any): void;
    realTransform(freqComplexBuffer: ComplexArray, input: Float32Array): void;
    inverseTransform(timeComplexBuffer: ComplexArray, freqComplexBufferShifted: ComplexArray): void;
}
declare var FFT: {
    (size: any): FFT;
    new(size: any): FFT;
    prototype: FFT;
};
export default FFT;
