import { audioContext } from '@rhombus/audio-context';
import { WorkerUrl } from 'worker-url';
import { PROCESSOR_NAME } from './constants';

await audioContext.audioWorklet.addModule(new WorkerUrl(new URL('./FnPassthrough.worklet.js', import.meta.url)));
export class FnPassthroughNode extends AudioWorkletNode {
    constructor(context: BaseAudioContext, options: AudioWorkletNodeOptions) {
        if (context !== audioContext) {
            throw 'this is only set up to work with the default audio context'
        }
        super(context, PROCESSOR_NAME, options);
    }

}
