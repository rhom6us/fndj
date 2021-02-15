declare module 'fft.js' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface ComplexArray extends Array<number> {}
  export default class fft {
    realTransform(freqComplexBuffer: ComplexArray, input: Float32Array): void;
    completeSpectrum(freqComplexBufferShifted: ComplexArray): void;
    inverseTransform(timeComplexBuffer: ComplexArray, freqComplexBufferShifted: ComplexArray): void;
    fromComplexArray(timeComplexBuffer: ComplexArray, output: Float32Array): void;
    constructor(size: number);
    createComplexArray(): ComplexArray;
  }
}
