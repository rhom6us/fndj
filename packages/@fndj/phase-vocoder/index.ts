import phaseVocoderWorklet from 'worlet-loader!./src/phase-vocoder.worklet.ts';

export { phaseVocoderWorklet };
const PROCESSOR_NAME = 'phase-vocoder-processor';
export default phaseVocoderWorklet;
export async function initializeWorklet(context: BaseAudioContext): Promise<typeof PhaseVocodoerNode> {
    await context.audioWorklet.addModule(PROCESSOR_NAME);
    return PhaseVocodoerNode;
}
export class PhaseVocodoerNode extends AudioWorkletNode {
    constructor(context: BaseAudioContext) {
        super(context, PROCESSOR_NAME);
    }
}
