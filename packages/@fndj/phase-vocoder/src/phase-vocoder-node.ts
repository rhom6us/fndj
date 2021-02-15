import { PITCH_FACTOR, PROCESSOR_NAME } from './constants';
import processorUrl from './phase-vocoder-processor.worklet.ts';

const { worklet: workletUrl } = JSON.parse(process.env.MANIFEST!);

//const url = new URL('./phase-vocoder-processor.w.ts', import.meta.url);

const inits = new Map<BaseAudioContext, Promise<void>>();

declare global {
  interface Map<K, V> {
    getOrAdd(key: K, factory: (key: K) => V): V;
  }
}
Map.prototype.getOrAdd = function <K, V>(this: Map<K, V>, key: K, factory: (key: K) => V) {
  if (!this.has(key)) {
    this.set(key, factory(key));
  }
  return this.get(key);
};
export class PhaseVocoderNode extends AudioWorkletNode {
  static async initialize(context: BaseAudioContext, parameterData: { pitchFactor: number } = { pitchFactor: 1.0 }) {
    await inits.getOrAdd(context, () => context.audioWorklet.addModule(workletUrl));
    return new PhaseVocoderNode(context);
  }
  get PitchFactor() {
    return this.parameters.get(PITCH_FACTOR)!;
  }
  constructor(context: BaseAudioContext, { pitchFactor = 1 } = {}) {
    if (!inits.has(context)) {
      throw new Error(`this audio worklet hasn't been initialized with this audiocontext`);
    }
    super(context, PROCESSOR_NAME, { processorOptions: {}, parameterData: { pitchFactor } });
  }
}
