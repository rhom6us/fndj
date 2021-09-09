import { audioContext } from '../../audio-context';
import { ARG1, ARG2, ARG3, PROCESSOR_NAME } from './constants';
import url from './FnFormulaProcessor.worklet.ts';

await audioContext.value.audioWorklet.addModule(url);
export interface ProcessorOptions {
  formula: string;
}
export interface ParameterData {
  [ARG1]?: any;
  [ARG2]?: any;
  [ARG3]?: any;
}
/**
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
export class FnFormulaNode extends AudioWorkletNode {
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

    super(context, PROCESSOR_NAME, {
      processorOptions: { formula },
      parameterData: { [ARG1]: arg1/*, [ARG2]:arg2, [ARG3]:arg3*/ }
    });
  }
}
