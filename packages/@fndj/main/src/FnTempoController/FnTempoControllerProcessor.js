class FnTempoControllerProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      {
        name: "tempo",
        defaultValue: 128,
        minValue: 1,
        maxValue: 1000,
        automationRate: "a-rate"
      }
    ];
  }

  constructor(options /*: AudioWorkletNodeOptions */) {
    super(options);
    this._isRunning = true;
    this._baseTempo = options.processorOptions.baseTempo;
    if (
      typeof this._baseTempo !== "number" ||
      isNaN(this._baseTempo) ||
      !isFinite(this._baseTempo)
    ) {
      throw new Error(
        `[FnTempoControllerProcessor] invalid baseTempo supplied to constructor. Value supplied was "${this._baseTempo}"`
      );
    }

    this.port.onmessage = (event) => {
      if ("isRunning" in event.data) {
      }
    };
  }
  process(
    inputs /*: Float32Array[][]*/,
    outputs /*: Float32Array[][]*/,
    parameters /*: Record<string, Float32Array>*/
  ) {
    const playbackRateOutput = outputs[0][0],
      pitchShiftOutput = outputs[1][0];

    for (
      let i = 0;
      i < Math.max(playbackRateOutput.length, pitchShiftOutput.length);
      i++
    ) {
      const currentTempo =
          parameters.tempo[Math.min(i, parameters.tempo.length - 1)],
        playbackRate = currentTempo / this._baseTempo,
        transpose = 12 * Math.log2(playbackRate);

      if (i < playbackRateOutput.length) {
        playbackRateOutput[i] = playbackRate;
      }
      if (i < pitchShiftOutput.length) {
        pitchShiftOutput[i] = transpose;
      }
    }

    return this._isRunning;
  }
}

registerProcessor("fn-tempo-controller", FnTempoControllerProcessor);
