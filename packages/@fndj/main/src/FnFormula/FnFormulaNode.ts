/**
 * formula instructions:
 * The processor will call the formula for each sample in each
 * channel. Available arguments are:
 *  x - the current sample value
 *  arg1
 *  arg2
 *  arg3
 *
 * example1: "12 * Math.log2(x)"
 * example2: "x * arg1"
 *
 */
export class FnFormulaNode extends AudioWorkletNode {
  private static _processInitialized = false;
  static async intialize(context: BaseAudioContext) {
    if (!FnFormulaNode._processInitialized) {
      await context.audioWorklet.addModule("./FnFormulaProcessor.js");
      FnFormulaNode._processInitialized = true;
    }
    return;
  }
  get arg1() {
    return this.parameters.get("arg1")!;
  }
  get arg2() {
    return this.parameters.get("arg2")!;
  }
  get arg3() {
    return this.parameters.get("arg3")!;
  }
  constructor(
    context: BaseAudioContext,
    {
      formula,
      arg1,
      arg2,
      arg3
    }: { formula: string; arg1?: number; arg2?: number; arg3?: number }
  ) {
    super(context, "fn-formula", {
      processorOptions: { formula },
      parameterData: { arg1: arg1 || 0, arg2: arg2 || 0, arg3: arg3 || 0 }
    });
  }
}
