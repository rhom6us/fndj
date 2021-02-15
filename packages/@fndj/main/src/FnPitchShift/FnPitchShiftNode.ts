
export interface FnPitchShiftNodeParameters {
  semitones?: number;
}
export class FnPitchShiftNode extends AudioWorkletNode {
  private static _processInitialized = false;
  static async initialize(context: BaseAudioContext) {
    if (!FnPitchShiftNode._processInitialized) {
      await context.audioWorklet.addModule("./fnPitchShiftProcessor.js");
      FnPitchShiftNode._processInitialized = true;
    }
    return;
  }
  get semitones(): AudioParam {
    return this.parameters.get("semitones")!;
  }

  constructor(
    context: BaseAudioContext,
    parameterData: FnPitchShiftNodeParameters = {}
  ) {
    super(context, "fn-pitch-shift", {
      parameterData: parameterData as Record<string, number>,
      processorOptions: {}
    });
  }
}
export default FnPitchShiftNode;
