import url from 'worklet-loader!phaze-vocoder';
import audioContext from '../audio-context';
import { PITCH_FACTOR, PROCESSOR_NAME } from './constants';


await audioContext.audioWorklet.addModule(url);

export class PhaseVocoderNode extends AudioWorkletNode {
    get [PITCH_FACTOR]() {
        return this.parameters.get(PITCH_FACTOR)!;
    }
    constructor(context: BaseAudioContext) {
        super(context, PROCESSOR_NAME);
    }
}
