import { PROCESSOR_NAME, TEMPO } from './constants';
import type { Options } from './FnTempoController.audio-node';

registerProcessor(PROCESSOR_NAME, class extends AudioWorkletProcessor {
  private _isRunning: boolean;
  private readonly _baseTempo: number;
  static get parameterDescriptors(): AudioParamDescriptor[] {
    return [
      {
        name: TEMPO,
        defaultValue: 128,
        minValue: 1,
        maxValue: 1000,
        automationRate: "a-rate"
      }
    ];
  }

  constructor(options: Options) {
    super();
    this._isRunning = true;
    this._baseTempo = options?.processorOptions?.baseTempo || 128;
    if (typeof this._baseTempo !== "number" || isNaN(this._baseTempo) || !isFinite(this._baseTempo)) {
      throw new Error(
        `[FnTempoControllerProcessor] invalid baseTempo supplied to constructor. Value supplied was "${this._baseTempo}"`
      );
    }

    // this.port.onmessage = (event) => {
    //   if ("isRunning" in event.data) {
    //     //noop
    //   }
    // };
  }
  process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>) {
    const playbackRateOutput = outputs[0][0];
    const pitchShiftOutput = outputs[1][0];

    for (let i = 0; i < Math.max(playbackRateOutput.length, pitchShiftOutput.length); i++) {
      const currentTempo = parameters['tempo'][Math.min(i, parameters['tempo'].length - 1)];
      const playbackRate = currentTempo / this._baseTempo;
      const transpose = 12 * Math.log2(playbackRate);

      if (i < playbackRateOutput.length) {
        playbackRateOutput[i] = playbackRate;
      }
      if (i < pitchShiftOutput.length) {
        pitchShiftOutput[i] = transpose;
      }
    }

    return this._isRunning;
  }
});
