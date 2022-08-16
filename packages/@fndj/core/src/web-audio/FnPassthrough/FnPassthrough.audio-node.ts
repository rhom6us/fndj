import { audioContext } from "@rhombus-toolkit/audio-context";
import { WorkerUrl } from 'worker-url';
import { PROCESSOR_NAME } from './constants';

await audioContext.audioWorklet.addModule(new WorkerUrl(new URL('./FnPassthrough.worklet.js', import.meta.url)));
export class FnPassthroughNode extends AudioWorkletNode {
    constructor(context: BaseAudioContext, options: AudioWorkletNodeOptions) {
        super(context, PROCESSOR_NAME, options);
    }

}
