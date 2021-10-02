import { PROCESSOR_NAME } from './constants';
import url from './FnPassthrough.worklet.ts';
export class FnPassthroughNode extends AudioWorkletNode {
    private static _processInitialized = false;
    public static async initialize(context: BaseAudioContext) {
        if (!FnPassthroughNode._processInitialized) {
            await context.audioWorklet.addModule(url);
            FnPassthroughNode._processInitialized = true;
        }
        return;
    }


    constructor(context: BaseAudioContext, options: AudioWorkletNodeOptions) {
        if (!FnPassthroughNode._processInitialized) {
            throw new Error(`this constructor isn't ready to be used yet. register it first`);
        }
        super(context, PROCESSOR_NAME, options);
    }

}
