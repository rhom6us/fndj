/* eslint-disable no-loops/no-loops */

import FFT, { ComplexArray } from 'fft.js';
import { BUFFERED_BLOCK_SIZE, PITCH_FACTOR, PROCESSOR_NAME, WEBAUDIO_BLOCK_SIZE } from './constants';
import { FftSize } from './FftSize';
import { OverlapAddProcessor } from './overlap-add-processor';



registerProcessor(
  PROCESSOR_NAME,
  class extends OverlapAddProcessor {
    private readonly fftSize: FftSize;
    private readonly hannWindow: Float32Array;
    private readonly fft: FFT;
    private readonly freqComplexBuffer: ComplexArray;
    private readonly freqComplexBufferShifted: ComplexArray;
    private readonly timeComplexBuffer: ComplexArray;
    private readonly magnitudes: Float32Array;
    private readonly peakIndexes: Int32Array;

    private timeCursor: number;
    private nbPeaks: number;

    static get parameterDescriptors(): AudioParamDescriptor[] {
      return [
        {
          name: PITCH_FACTOR,
          defaultValue: 1.0,
          minValue: 0.5,
          maxValue: 2.0,
          automationRate: 'k-rate',
        },
      ];
    }

    constructor(options: AudioWorkletNodeOptions = {}) {
      super({ ...options, processorOptions: { ...options.processorOptions, blockSize: BUFFERED_BLOCK_SIZE } });

      this.fftSize = this.blockSize;
      this.timeCursor = 0;

      this.hannWindow = new Float32Array(this.blockSize).map((_, i) => 0.5 * (1 - Math.cos((2 * Math.PI * i) / this.blockSize)));

      // prepare FFT and pre-allocate buffers
      this.fft = new FFT(this.fftSize);
      this.freqComplexBuffer = this.fft.createComplexArray();
      this.freqComplexBufferShifted = this.fft.createComplexArray();
      this.timeComplexBuffer = this.fft.createComplexArray();
      this.magnitudes = new Float32Array(this.fftSize / 2 + 1);
      this.peakIndexes = new Int32Array(this.magnitudes.length);
      this.nbPeaks = 0;
    }

    processOLA(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>) {
      // no automation, take last value
      const pitchFactor = parameters[PITCH_FACTOR][parameters[PITCH_FACTOR].length - 1];

      for (let i = 0; i < this.numberOfInputs; i++) {
        for (let j = 0; j < inputs[i].length; j++) {
          // big assumption here: output is symetric to input
          const input = inputs[i][j];
          const output = outputs[i][j];

          this.applyHannWindow(input);

          this.fft.realTransform(this.freqComplexBuffer, input);

          this.computeMagnitudes();
          this.findPeaks();
          this.shiftPeaks(pitchFactor);

          this.fft.completeSpectrum(this.freqComplexBufferShifted);
          this.fft.inverseTransform(this.timeComplexBuffer, this.freqComplexBufferShifted);
          this.fft.fromComplexArray(this.timeComplexBuffer, output);

          this.applyHannWindow(output);
        }
      }

      this.timeCursor += WEBAUDIO_BLOCK_SIZE;
    }

    /** Apply Hann window in-place */
    applyHannWindow(input: Float32Array) {
      for (let i = 0; i < this.blockSize; i++) {
        input[i] *= this.hannWindow[i];
      }
    }

    /** Compute squared magnitudes for peak finding **/
    computeMagnitudes() {
      // for (let x = 0; x < this.magnitudes.length; x++){
      //   const interleavedIndex = x * 2;
      //   const real = this.freqComplexBuffer[interleavedIndex];
      //   const imag = this.freqComplexBuffer[interleavedIndex + 1];
      //   // no need to sqrt for peak finding
      //   this.magnitudes[x] = real ** 2 + imag ** 2;
      // }


      let i = 0,
        j = 0;
      while (i < this.magnitudes.length) {
        // const [r, i] = this.freqComplexBuffer.slice(j, j + 1);
        const real = this.freqComplexBuffer[j];
        const imag = this.freqComplexBuffer[j + 1];
        // no need to sqrt for peak finding
        this.magnitudes[i] = real ** 2 + imag ** 2;
        i += 1;
        j += 2;
      }
    }

    /** Find peaks in spectrum magnitudes **/
    findPeaks() {
      this.nbPeaks = 0;

      // for (let x = 2; x < this.magnitudes.length - 2; x++){
      //   const mag = this.magnitudes[x];
      //   if (mag > this.magnitudes[x - 1] && mag > this.magnitudes[x - 2]) {
      //     if (mag > this.magnitudes[x + 1] && mag > this.magnitudes[x + 2]) {
      //       this.peakIndexes[this.nbPeaks] = x++;
      //       this.nbPeaks++;
      //     }
      //   }
      // }


      let i = 2;
      const end = this.magnitudes.length - 2;

      while (i < end) {
        const mag = this.magnitudes[i];

        if (this.magnitudes[i - 1] >= mag || this.magnitudes[i - 2] >= mag) {
          i++;
          continue;
        }
        if (this.magnitudes[i + 1] >= mag || this.magnitudes[i + 2] >= mag) {
          i++;
          continue;
        }

        this.peakIndexes[this.nbPeaks] = i;
        this.nbPeaks++;
        i += 2;
      }
    }

    /** Shift peaks and regions of influence by pitchFactor into new specturm */
    shiftPeaks(pitchFactor: number) {
      // zero-fill new spectrum
      this.freqComplexBufferShifted.fill(0);

      for (let i = 0; i < this.nbPeaks; i++) {
        const peakIndex = this.peakIndexes[i];
        const peakIndexShifted = Math.round(peakIndex * pitchFactor);

        if (peakIndexShifted > this.magnitudes.length) {
          break;
        }

        // find region of influence
        let midPointToPreviousPeak = 0;
        let midPointToNextPeak = this.fftSize as number;
        if (i > 0) {
          const peakIndexBefore = this.peakIndexes[i - 1];
          // halfway to the previous peak
          midPointToPreviousPeak = peakIndex - Math.floor((peakIndex - peakIndexBefore) / 2);
        }
        if (i < this.nbPeaks - 1) {
          const peakIndexAfter = this.peakIndexes[i + 1];

          // halfway to the next peak
          midPointToNextPeak = peakIndex + Math.ceil((peakIndexAfter - peakIndex) / 2);
        }

        // shift whole region of influence around peak to shifted peak
        const startOffset = midPointToPreviousPeak - peakIndex;
        const endOffset = midPointToNextPeak - peakIndex;
        for (let j = startOffset; j < endOffset; j++) {
          const binIndex = peakIndex + j;
          const binIndexShifted = peakIndexShifted + j;

          if (binIndexShifted >= this.magnitudes.length) {
            break;
          }

          // apply phase correction
          const omegaDelta = (2 * Math.PI * (binIndexShifted - binIndex)) / this.fftSize;
          const phaseShiftReal = Math.cos(omegaDelta * this.timeCursor);
          const phaseShiftImag = Math.sin(omegaDelta * this.timeCursor);

          const indexReal = binIndex * 2;
          const indexImag = indexReal + 1;
          const valueReal = this.freqComplexBuffer[indexReal];
          const valueImag = this.freqComplexBuffer[indexImag];

          const valueShiftedReal = valueReal * phaseShiftReal - valueImag * phaseShiftImag;
          const valueShiftedImag = valueReal * phaseShiftImag + valueImag * phaseShiftReal;

          const indexShiftedReal = binIndexShifted * 2;
          const indexShiftedImag = indexShiftedReal + 1;
          this.freqComplexBufferShifted[indexShiftedReal] += valueShiftedReal;
          this.freqComplexBufferShifted[indexShiftedImag] += valueShiftedImag;
        }
      }
    }
  },
);
