import { PROCESSOR_NAME, SEMITONES } from './constants';
import url from './FnPitchShift.worklet.ts';
export interface FnPitchShiftNodeParameters {
  semitones?: number;
}
export class FnPitchShiftNode extends AudioWorkletNode {
  private static _processInitialized = false;
  static async initialize(context: BaseAudioContext) {
    if (!FnPitchShiftNode._processInitialized) {
      await context.audioWorklet.addModule(url);
      FnPitchShiftNode._processInitialized = true;
    }
    return;
  }
  get [SEMITONES](): AudioParam {
    return this.parameters.get(SEMITONES)!;
  }

  constructor(context: BaseAudioContext, parameterData: FnPitchShiftNodeParameters = {}) {
    super(context, PROCESSOR_NAME, {
      parameterData: parameterData as Record<string, number>,
      processorOptions: {}
    });
  }
}
export default FnPitchShiftNode;
