/* eslint-disable @typescript-eslint/ban-types */
import "@types/webaudio";
import { AudioNodeScript } from './AudioNodeScript';
import { ARG1, ARG2, ARG3, ARG4, PROCESSOR_NAME } from './constants';
import { ParameterData } from "./ParameterData";

registerProcessor(PROCESSOR_NAME, class extends AudioWorkletProcessor {
  private readonly _fn: AudioNodeScript;
  static get parameterDescriptors():AudioParamDescriptor[] {
    return [
      {
        name: ARG1,
        automationRate: "a-rate"
      },
      {
        name: ARG2,
        automationRate: "a-rate"
      },
      {
        name: ARG3,
        automationRate: "k-rate"
      },
      {
        name: ARG4,
        automationRate: "k-rate"
      }
    ];
  }

  constructor(options:AudioWorkletNodeOptions = {processorOptions: {script: defaultScript.toString()}}) {
    super();
    this._fn = eval(options.processorOptions.script) as AudioNodeScript;
  }
  process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<keyof ParameterData, Float32Array>) {
    return this._fn(inputs, outputs, parameters);
  }
});


const defaultScript: AudioNodeScript = (inputs, outputs) => {
  inputs.forEach((channels, input) => channels.forEach((samples, channel) => outputs[input][channel].set(samples)));
  return false;
}