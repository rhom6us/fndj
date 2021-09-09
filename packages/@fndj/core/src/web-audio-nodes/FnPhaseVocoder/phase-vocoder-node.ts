import { FFT_SIZE, PITCH_FACTOR, PROCESSOR_NAME } from './constants';
// import processorUrl from './phase-vocoder-processor.worklet.ts';
import { FftSize } from './FftSize';

import url from './phase-vocoder-processor.worklet.ts';
import { audioContext } from '../..';
import { enableLogging, logger } from '@fndj/util';
await audioContext.value.audioWorklet.addModule(url);
//const url = new URL('./phase-vocoder-processor.w.ts', import.meta.url);


export interface PhaseVocoderNodeOptions {
  [PITCH_FACTOR]?: number;
  [FFT_SIZE]?: FftSize;
}
export class PhaseVocoderNode extends AudioWorkletNode {
  enableLogging(enabled = true) {
    enableLogging(enabled);
  }
  get [PITCH_FACTOR]() {
    return this.parameters.get(PITCH_FACTOR)!;
  }

  constructor(context: BaseAudioContext, options: PhaseVocoderNodeOptions = { [PITCH_FACTOR]: 1 }) {
    const la = { processorOptions: { [FFT_SIZE]: options[FFT_SIZE] ?? 1024 }, parameterData: { [PITCH_FACTOR]: options[PITCH_FACTOR] ?? 1 } };
    logger.log("sending in fft size " + options[FFT_SIZE]);
    super(context, PROCESSOR_NAME, la);
  }
}
