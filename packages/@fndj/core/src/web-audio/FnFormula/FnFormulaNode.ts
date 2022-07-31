///<reference types="webaudio"/>
import audioContext from "@rhombus-toolkit/audio-context";
// import url from './FnFormulaProcessor.worklet.js';
import { WorkerUrl } from 'worker-url';
import { ARG1, ARG2, ARG3, PROCESSOR_NAME } from './constants';

await audioContext.audioWorklet.addModule(new WorkerUrl(new URL('./FnFormulaProcessor.worklet.js', import.meta.url)));


/** @public */
export interface ProcessorOptions {
  formula: string;
}

/** @public */
export interface ParameterData {
  [ARG1]?: any;
  [ARG2]?: any;
  [ARG3]?: any;
}
/**
 * @public
 * formula instructions:
 * The processor will call the formula for each sample in each
 * channel. Available arguments are:
 *  x - the current sample value
 *  [ARG1]
 *  [ARG2]
 *  [ARG3]
 *
 * example1: "12 * Math.log2(x)"
 * example2: "x * [ARG1]"
 *
 */
export interface FnFormulaNode extends AudioWorkletNode {
  readonly [ARG1]: AudioParam;
}
interface FnFormulaNodeConstructor {
  new(context: BaseAudioContext, options: ProcessorOptions & ParameterData): FnFormulaNode;
  readonly prototype: FnFormulaNode;
}

/** @public */
export const FnFormulaNode: FnFormulaNodeConstructor = class extends AudioWorkletNode implements FnFormulaNode {
  get [ARG1]() {
    return this.parameters.get(ARG1)!;
  }
  // get [ARG2]() {
  //   return this.parameters.get(ARG2)!;
  // }
  // get [ARG3]() {
  //   return this.parameters.get(ARG3)!;
  // }

  constructor(
    context: BaseAudioContext, {
      formula,
      [ARG1]: arg1,
      // [ARG2]:arg2,
      // [ARG3]:arg3
    }: ProcessorOptions & ParameterData,
  ) {
    if (context !== audioContext) {
      throw 'this is only set up to work with the default audio context';
    }

    super(context, PROCESSOR_NAME, {
      processorOptions: { formula },
      parameterData: { [ARG1]: arg1/*, [ARG2]:arg2, [ARG3]:arg3*/ }
    });
  }
}