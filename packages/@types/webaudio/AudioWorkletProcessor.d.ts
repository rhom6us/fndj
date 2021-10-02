
// interface AudioWorkletProcessor {
//   readonly port: MessagePort;
//   process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean;
// }

// var AudioWorkletProcessor: {
//   prototype: AudioWorkletProcessor;
//   new(options?: AudioWorkletNodeOptions): AudioWorkletProcessor;
//   parameterDescriptors: AudioParamDescriptor[];
// };


interface AudioParamDescriptor {
  automationRate?: AutomationRate;
  defaultValue?: number;
  maxValue?: number;
  minValue?: number;
  name: string;
}
declare abstract class AudioWorkletProcessor {
  //  static readonly parameterDescriptors: AudioParamDescriptor[];
  constructor(options?: AudioWorkletNodeOptions);
  readonly port: MessagePort;
  abstract process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean;
}
type AudioWorkletProcessorStatic = {
  parameterDescriptors: AudioParamDescriptor[];
};
declare function registerProcessor(name: string, processorCtor: typeof AudioWorkletProcessor & AudioWorkletProcessorStatic): undefined;
    // const currentFrame: number;
    // const currentTime: number;
    // const sampleRate: number;

  // function registerProcessor<T extends AudioWorkletProcessorCtor>(name: string, processorCtor: T): undefined;

// declare abstract class AudioWorkletProcessor {
//   //  static readonly parameterDescriptors: AudioParamDescriptor[];
//   constructor(options?: AudioWorkletNodeOptions);
//   readonly port: MessagePort;
//   abstract process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean;
// }
// type AudioWorkletProcessorStatic = {
//   parameterDescriptors: AudioParamDescriptor[];
// };
// declare function registerProcessor(name: string, processorCtor: typeof AudioWorkletProcessor & AudioWorkletProcessorStatic): undefined;
// // function registerProcessor<T extends AudioWorkletProcessorCtor>(name: string, processorCtor: T): undefined;
