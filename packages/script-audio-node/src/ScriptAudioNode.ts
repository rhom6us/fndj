import "@types/webaudio";
import { AudioNodeScript } from "./AudioNodeScript";
import { ARG1, ARG2, ARG3, ARG4, PROCESSOR_NAME } from "./constants";
import { ParameterData } from "./ParameterData";
export type ScriptAudioNodeOptions = Omit<AudioWorkletNodeOptions, "parameterData" | "processorOptions"> & {
  script: AudioNodeScript;
  parameterData?: ParameterData;
};

export interface ScriptAudioNode extends AudioNode {
  readonly [ARG1]: AudioParam;
  readonly [ARG2]: AudioParam;
  readonly [ARG3]: AudioParam;
  readonly [ARG4]: AudioParam;
}
export interface ScriptAudioNodeConstructor {
  new(context: BaseAudioContext, options: ScriptAudioNodeOptions): ScriptAudioNode;
  readonly prototype: ScriptAudioNode;
}

export class _ScriptAudioNode extends AudioWorkletNode implements ScriptAudioNode {
  get [ARG1]() {
    return this.parameters.get(ARG1)!;
  }
  get [ARG2]() {
    return this.parameters.get(ARG2)!;
  }
  get [ARG3]() {
    return this.parameters.get(ARG3)!;
  }
  get [ARG4]() {
    return this.parameters.get(ARG4)!;
  }

  constructor (context: BaseAudioContext, options: ScriptAudioNodeOptions) {
    super(context, PROCESSOR_NAME, {
      processorOptions: { script: options.script.toString() },
      parameterData: options?.parameterData as any,
    });
  }
}
