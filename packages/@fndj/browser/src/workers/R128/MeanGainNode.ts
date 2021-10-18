export class MeanGainNode extends GainNode {
    constructor(context: BaseAudioContext, options: Omit<GainOptions, 'gain'> = {}) {
        super(context, { ...options, gain: 1 / (context.sampleRate * 3) });
    }
}
