import { ARG1, ARG2, ARG3, PROCESSOR_NAME } from './constants';
import url from './FnFormulaProcessor.worklet.ts'
const initializedContextsWithThisWorklet = new Map<BaseAudioContext, Promise<void>>();

export interface ProcessorOptions{
  formula: string;
}
export interface ParameterData{
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
  static async create(context: BaseAudioContext): Promise<typeof FnFormulaNode> {
    console.log({ url });
    if (!initializedContextsWithThisWorklet.has(context)) {
      initializedContextsWithThisWorklet.set(context, context.audioWorklet.addModule(url));
    }
    await initializedContextsWithThisWorklet.get(context);
    return FnFormulaNode;
  }
  constructor(
    context: BaseAudioContext,  {
      formula,
      [ARG1]:arg1,
      // [ARG2]:arg2,
      // [ARG3]:arg3
    }: ProcessorOptions & ParameterData,
  ) {
    if (!initializedContextsWithThisWorklet.has(context)) {
      throw new Error('Invalid constructor');
    }
    super(context, PROCESSOR_NAME, {
      processorOptions: { formula },
      parameterData: { [ARG1]:arg1/*, [ARG2]:arg2, [ARG3]:arg3*/ }
    });
  }
}
