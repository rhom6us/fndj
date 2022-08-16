import { PROCESSOR_NAME } from "./constants";

registerProcessor(
  PROCESSOR_NAME,
  class extends AudioWorkletProcessor {
    static get parameterDescriptors(): AudioParamDescriptor[] {
      return [];
    }

    process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>) {
      // const something = Iter.from(inputs)
      //   .zip(outputs)
      //   .flatMap((p) => zip(...p));
      // const somethingB = Iter.from(inputs).zip(outputs).flatMap(spread(zip)).forEach(spread((input, output) => output.set(input));
      // const something2 = flatMap(zip(inputs, outputs), spread(zip));
      // const something3 = flatMap(zip(inputs, outputs), ([input, output]) => zip(input, output));

      // forEach(zip(inputs, outputs), ([input, output]) => {
      //   forEach(zip(input, output), ([chnlIn, chnlOut]) => {
      //     chnlOut.set(chnlIn);
      //   });
      // });
      // for (const [inputChannels, outputChannels] of zip(inputs, outputs)) {
      //   for (const [inputSamples, outputSamples] of zip(inputChannels, outputChannels)) {
      //     outputSamples.set(inputSamples);
      //   }
      // }
      for (let ioIndex = 0; ioIndex < inputs.length; ioIndex++) {
        for (let channelIndex = 0; channelIndex < inputs[ioIndex].length; channelIndex++) {
          outputs[ioIndex][channelIndex].set(inputs[ioIndex][channelIndex]);
        }
      }
      return true;
    }
  }
);

