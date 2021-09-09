import { PROCESSOR_NAME } from './constants';

registerProcessor(PROCESSOR_NAME, class extends AudioWorkletProcessor {
    static get parameterDescriptors(): AudioParamDescriptor[] {
        return [];
    }

    process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>) {
        for (let ioIndex = 0; ioIndex < inputs.length; ioIndex++) {
            for (let channelIndex = 0; channelIndex < inputs[ioIndex].length; channelIndex++) {
                for (let sampleIndex = 0; sampleIndex < inputs[ioIndex][channelIndex].length; sampleIndex++) {
                    outputs[ioIndex][channelIndex][sampleIndex] = inputs[ioIndex][channelIndex][sampleIndex];
                }
            }
        }
        return true;

        // const leftInputChannel = inputs[0][0];
        // const leftInputChannelLength = leftInputChannel.length;
        // const leftInputChannelBravado = Math.max(...Array.from(leftInputChannel));
    }
});
