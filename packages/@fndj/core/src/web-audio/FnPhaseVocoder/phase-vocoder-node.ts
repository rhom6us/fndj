// import url from 'worklet-loader!./phase-vocoder-processor.worklet';
import { audioContext } from '@rhombus/audio-context';
import { enableLogging, logger } from '@rhombus/logger';
import { WorkerUrl } from 'worker-url';
import { FFT_SIZE, PITCH_FACTOR, PROCESSOR_NAME } from './constants';
// import processorUrl from './phase-vocoder-processor.worklet.ts';
import { FftSize } from './FftSize';


await audioContext.audioWorklet.addModule(new WorkerUrl(new URL('./phase-vocoder-processor.worklet.js', import.meta.url)));



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
    if (context !== audioContext) {
      throw 'this is only set up to work with the default audio context';
    }
    const la = { processorOptions: { [FFT_SIZE]: options[FFT_SIZE] ?? 1024 }, parameterData: { [PITCH_FACTOR]: options[PITCH_FACTOR] ?? 1 } };
    logger.log(`sending in fft size ${options[FFT_SIZE]}`);
    super(context, PROCESSOR_NAME, la);
  }
}
