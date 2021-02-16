/* eslint-disable @typescript-eslint/ban-types */

import { ARG1, ARG2, ARG3, PROCESSOR_NAME } from './constants';

registerProcessor(PROCESSOR_NAME, class extends AudioWorkletProcessor {
  private readonly _fn: Function;
  static get parameterDescriptors():AudioParamDescriptor[] {
    return [
      {
        name: ARG1,
        automationRate: "a-rate"
      },
      // {
      //   name: ARG2,
      //   automationRate: "a-rate"
      // },
      // {
      //   name: ARG3,
      //   automationRate: "a-rate"
      // }
    ];
  }

  constructor(options:AudioWorkletNodeOptions = {processorOptions: {formula: 'x'}}) {
    super(options);
    this._fn = new Function("x", ARG1, /*ARG2, ARG3,*/ `return ${options.processorOptions.formula || 'x'};`);
  }
  process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>) {
    for (let bus = 0; bus < Math.min(inputs.length, outputs.length); bus++) {
      for (let channel = 0; channel < Math.min(inputs[bus].length, outputs[bus].length); channel++) {
        for (let sample = 0; sample < Math.min(inputs[bus][channel].length, outputs[bus][channel].length); sample++) {
          outputs[bus][channel][sample] = this._fn(
            inputs[bus][channel][sample],
            parameters[ARG1][Math.min(sample, parameters[ARG1].length-1)],
            // parameters[ARG2][Math.min(sample, parameters[ARG2].length-1)],
            // parameters[ARG3][Math.min(sample, parameters[ARG3].length-1)],
          );
        }
      }
    }

    return false;
  }
});
