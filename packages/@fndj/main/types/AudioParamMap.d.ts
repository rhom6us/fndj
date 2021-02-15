export {};

declare global {
  interface AudioParamMap extends Map<string, AudioParam> {}
}
// //declare global {
// declare class AudioWorkletProcessor {
//   static readonly parameterDescriptors: AudioParamDescriptor[];
//   readonly port: MessagePort;
//   constructor(options?: AudioWorkletNodeOptions);
//   process(
//     inputs: Float32Array[][],
//     outputs: Float32Array[][],
//     parameters: Record<string, Float32Array>
//   ): boolean;
// }

declare function registerProcessor(
  name: string,
  processorCtor: (new (
    options?: AudioWorkletNodeOptions
  ) => AudioWorkletProcessor) & {
    parameterDescriptors?: AudioParamDescriptor[];
  }
): void;
declare abstract class AudioWorkletProcessor{
  static readonly parameterDescriptors: AudioParamDescriptor
     readonly port: MessagePort;
   constructor(options?: AudioWorkletNodeOptions);
  abstract process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean;
}
