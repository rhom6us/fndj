import { PITCH_FACTOR, PROCESSOR_NAME } from './constants';
// import processorUrl from './phase-vocoder-processor.worklet.ts';
import './util/map';
import { getOrAdd } from './util';

const processorUrl = '';
//const url = new URL('./phase-vocoder-processor.w.ts', import.meta.url);

const initializedContextsWithThisWorklet = new Map<BaseAudioContext, Promise<void>>();

export interface PhaseVocoderNodeOptions{
  [PITCH_FACTOR]?: number;
}
export class PhaseVocoderNode extends AudioWorkletNode {
  get [PITCH_FACTOR]() {
    return this.parameters.get(PITCH_FACTOR)!;
  }
  static async create(context: BaseAudioContext) {

    await getOrAdd(initializedContextsWithThisWorklet, context, () => context.audioWorklet.addModule(processorUrl));
    return PhaseVocoderNode;
  }
  constructor(context: BaseAudioContext, options:PhaseVocoderNodeOptions = {[PITCH_FACTOR]: 1}) {
    if (!initializedContextsWithThisWorklet.has(context)) {
      throw new Error(`this audio worklet hasn't been initialized with this audiocontext`);
    }
    const factor = options.pitchFactor;
    const la = { processorOptions: {}, parameterData: { pitchFactor: factor || 1 } };
    super(context, PROCESSOR_NAME, la);
  }
}
