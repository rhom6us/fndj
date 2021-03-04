/* eslint-disable no-loops/no-loops */
import { WEBAUDIO_BLOCK_SIZE } from './constants';

// function range(length: number) {
//     return (new Array(length)).fill(null).map((_,i) => i)
// }
/** Overlap-Add Node */
export abstract class OverlapAddProcessor extends AudioWorkletProcessor {
    protected readonly numberOfInputs: number;
    protected readonly numberOfOutputs: number;
    protected readonly blockSize: number;
    protected readonly hopSize: number;
    private readonly nbOverlaps: number;
    private readonly inputBuffers: Float32Array[][];
    private readonly inputBuffersHead: Float32Array[][];
    private readonly inputBuffersToSend: Float32Array[][];
    private readonly outputBuffers: Float32Array[][];
    private readonly outputBuffersToRetrieve: Float32Array[][];
    constructor({ numberOfInputs = 1, numberOfOutputs = 1, processorOptions: { blockSize = 2048 } = {} } = {}) {
        super({ numberOfInputs, numberOfOutputs, processorOptions: { blockSize } });
        this.numberOfInputs = numberOfInputs;
        this.numberOfOutputs = numberOfOutputs;
        this.blockSize = blockSize;
        // TODO for now, the only support hop size is the size of a web audio block
        this.hopSize = WEBAUDIO_BLOCK_SIZE;
        this.nbOverlaps = this.blockSize / this.hopSize;
        // pre-allocate input buffers (will be reallocated if needed)
        this.inputBuffers = new Array(this.numberOfInputs);
        this.inputBuffersHead = new Array(this.numberOfInputs);
        this.inputBuffersToSend = new Array(this.numberOfInputs);
        // default to 2 channel per input until we know more
        // range(this.numberOfInputs).forEach(i => this.allocateInputChannels(i, 2));
        for (let i = 0; i < this.numberOfInputs; i++) {
            this.allocateInputChannels(i, 1);
        }
        // pre-allocate output buffers (will be reallocated if needed)
        this.outputBuffers = new Array(this.numberOfOutputs);
        this.outputBuffersToRetrieve = new Array(this.numberOfOutputs);
        // default to 2 channel per output until we know more
        // range(this.numberOfOutputs).forEach(i => this.allocateOutputChannels(i, 2));
        for (let i = 0; i < this.numberOfOutputs; i++) {
            this.allocateOutputChannels(i, 1);
        }
    }
    /** Handles dynamic reallocation of input/output channels buffer
       (channel numbers may vary during lifecycle) **/
    private reallocateChannelsIfNeeded(inputs: Float32Array[][], outputs: Float32Array[][]) {
        for (let i = 0; i < this.numberOfInputs; i++) {
            const nbChannels = inputs[i].length;
            if (nbChannels != this.inputBuffers[i].length) {
                this.allocateInputChannels(i, nbChannels);
            }
        }
        for (let i = 0; i < this.numberOfOutputs; i++) {
            const nbChannels = outputs[i].length;
            if (nbChannels != this.outputBuffers[i].length) {
                this.allocateOutputChannels(i, nbChannels);
            }
        }
    }
    private allocateInputChannels(inputIndex: number, nbChannels: number) {
        // // allocate input buffers
        // this.inputBuffers[inputIndex] = range(nbChannels).map(() => new Float32Array(this.blockSize + WEBAUDIO_BLOCK_SIZE).fill(0))
        // // allocate input buffers to send and head pointers to copy from (cannot directly send a pointer/subarray because input may be modified)
        // this.inputBuffersHead[inputIndex] = this.inputBuffers[inputIndex].map((arr) => arr.subarray(0, this.blockSize));
        // this.inputBuffersToSend[inputIndex] = this.inputBuffers[inputIndex].map(() => new Float32Array(this.blockSize));
        // allocate input buffers
        this.inputBuffers[inputIndex] = new Array(nbChannels);
        this.inputBuffersHead[inputIndex] = new Array(nbChannels);
        this.inputBuffersToSend[inputIndex] = new Array(nbChannels);
        for (let i = 0; i < nbChannels; i++) {
            this.inputBuffers[inputIndex][i] = new Float32Array(this.blockSize + WEBAUDIO_BLOCK_SIZE);
            this.inputBuffers[inputIndex][i].fill(0);
            this.inputBuffersHead[inputIndex][i] = this.inputBuffers[inputIndex][i].subarray(0, this.blockSize);
            this.inputBuffersToSend[inputIndex][i] = new Float32Array(this.blockSize);
        }
        return;
        // allocate input buffers to send and head pointers to copy from (cannot directly send a pointer/subarray because input may be modified)
        this.inputBuffersHead[inputIndex] = new Array(nbChannels);
        this.inputBuffersToSend[inputIndex] = new Array(nbChannels);
        for (let i = 0; i < nbChannels; i++) {
            this.inputBuffersHead[inputIndex][i] = this.inputBuffers[inputIndex][i].subarray(0, this.blockSize);
            this.inputBuffersToSend[inputIndex][i] = new Float32Array(this.blockSize);
        }
    }
    private allocateOutputChannels(outputIndex: number, nbChannels: number) {
        // allocate output buffers
        this.outputBuffers[outputIndex] = new Array(nbChannels);
        this.outputBuffersToRetrieve[outputIndex] = new Array(nbChannels);
        for (let i = 0; i < nbChannels; i++) {
            this.outputBuffers[outputIndex][i] = new Float32Array(this.blockSize);
            this.outputBuffers[outputIndex][i].fill(0);
            this.outputBuffersToRetrieve[outputIndex][i] = new Float32Array(this.blockSize);
            this.outputBuffersToRetrieve[outputIndex][i].fill(0);
        }
        return;
        // allocate output buffers to retrieve
        // (cannot send a pointer/subarray because new output has to be add to exising output)
        this.outputBuffersToRetrieve[outputIndex] = new Array(nbChannels);
        for (let i = 0; i < nbChannels; i++) {
            this.outputBuffersToRetrieve[outputIndex][i] = new Float32Array(this.blockSize);
            this.outputBuffersToRetrieve[outputIndex][i].fill(0);
        }
    }
    // /** Read next web audio block to input buffers **/
    // readInputs(inputs: Float32Array[][]) {
    //     // when playback is paused, we may stop receiving new samples
    //     if (inputs[0].length && inputs[0][0].length == 0) {
    //         for (let i = 0; i < this.numberOfInputs; i++) {
    //             for (let j = 0; j < this.inputBuffers[i].length; j++) {
    //                 this.inputBuffers[i][j].fill(0, this.blockSize);
    //             }
    //         }
    //         return;
    //     }
    //     for (let i = 0; i < this.numberOfInputs; i++) {
    //         for (let j = 0; j < this.inputBuffers[i].length; j++) {
    //             const webAudioBlock = inputs[i][j];
    //             this.inputBuffers[i][j].set(webAudioBlock, this.blockSize);
    //         }
    //     }
    // }
    // /** Write next web audio block from output buffers **/
    // writeOutputs(outputs: Float32Array[][]) {
    //     for (let i = 0; i < this.numberOfInputs; i++) {
    //         for (let j = 0; j < this.inputBuffers[i].length; j++) {
    //             const webAudioBlock = this.outputBuffers[i][j].subarray(0, WEBAUDIO_BLOCK_SIZE);
    //             outputs[i][j].set(webAudioBlock);
    //         }
    //     }
    // }
    // /** Shift left content of input buffers to receive new web audio block **/
    // shiftInputBuffers() {
    //     for (var i = 0; i < this.numberOfInputs; i++) {
    //         for (var j = 0; j < this.inputBuffers[i].length; j++) {
    //             this.inputBuffers[i][j].copyWithin(0, WEBAUDIO_BLOCK_SIZE);
    //         }
    //     }
    // }
    // /** Shift left content of output buffers to receive new web audio block **/
    // shiftOutputBuffers() {
    //     for (let i = 0; i < this.numberOfOutputs; i++) {
    //         for (let j = 0; j < this.outputBuffers[i].length; j++) {
    //             this.outputBuffers[i][j].copyWithin(0, WEBAUDIO_BLOCK_SIZE);
    //             this.outputBuffers[i][j].subarray(this.blockSize - WEBAUDIO_BLOCK_SIZE).fill(0);
    //         }
    //     }
    // }
    // /** Copy contents of input buffers to buffer actually sent to process **/
    // prepareInputBuffersToSend() {
    //     for (let i = 0; i < this.numberOfInputs; i++) {
    //         for (let j = 0; j < this.inputBuffers[i].length; j++) {
    //             this.inputBuffersToSend[i][j].set(this.inputBuffersHead[i][j]);
    //         }
    //     }
    // }
    // /** Add contents of output buffers just processed to output buffers **/
    // handleOutputBuffersToRetrieve() {
    //     for (let i = 0; i < this.numberOfOutputs; i++) {
    //         for (let j = 0; j < this.outputBuffers[i].length; j++) {
    //             for (let k = 0; k < this.blockSize; k++) {
    //                 this.outputBuffers[i][j][k] += this.outputBuffersToRetrieve[i][j][k] / this.nbOverlaps;
    //             }
    //         }
    //     }
    // }
    process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean {
        this.reallocateChannelsIfNeeded(inputs, outputs);
        //this.readInputs(inputs);
        // Read next web audio block to input buffers
        if (inputs[0].length && inputs[0][0].length == 0) {
            // when playback is paused, we may stop receiving new samples
            for (let i = 0; i < this.numberOfInputs; i++) {
                for (let j = 0; j < this.inputBuffers[i].length; j++) {
                    this.inputBuffers[i][j].fill(0, this.blockSize);
                }
            }
        } else {
            //this.inputBuffers.forEach((inputBuffer, i) => inputBuffer.forEach((channel, j) => channel.set(inputs[i][j], this.blockSize)));
            for (let i = 0; i < this.numberOfInputs; i++) {
                for (let j = 0; j < this.inputBuffers[i].length; j++) {
                    const webAudioBlock = inputs[i][j];
                    this.inputBuffers[i][j].set(webAudioBlock, this.blockSize);
                }
            }
        }
        // this.shiftInputBuffers();
        // Shift left content of input buffers to receive new web audio block
        //this.inputBuffers.forEach(inputBuffer => inputBuffer.forEach(channel => channel.copyWithin(0, WEBAUDIO_BLOCK_SIZE)));
        for (let i = 0; i < this.numberOfInputs; i++) {
            for (let j = 0; j < this.inputBuffers[i].length; j++) {
                this.inputBuffers[i][j].copyWithin(0, WEBAUDIO_BLOCK_SIZE);
            }
        }
        // this.prepareInputBuffersToSend()
        // Copy contents of input buffers to buffer actually sent to process
        //this.inputBuffers.forEach((inputBuffer, i) => inputBuffer.forEach((channel, j) => this.inputBuffersToSend[i][j].set(this.inputBuffersHead[i][j])));
        //this.inputBuffersToSend.forEach((buffer, i) => buffer.forEach((channel, j) => channel.set(this.inputBuffersHead[i][j])))
        for (let i = 0; i < this.numberOfInputs; i++) {
            for (let j = 0; j < this.inputBuffers[i].length; j++) {
                this.inputBuffersToSend[i][j].set(this.inputBuffersHead[i][j]);
            }
        }
        this.processOLA(this.inputBuffersToSend, this.outputBuffersToRetrieve, parameters);
        // this.handleOutputBuffersToRetrieve();
        // Add contents of output buffers just processed to output buffers
        // this.outputBuffers.forEach((outputBuffer, i) => outputBuffer.forEach((channel, j) => {
        //     range(this.blockSize).forEach(k => {
        //         channel[k] += this.outputBuffersToRetrieve[i][j][k] / this.nbOverlaps;
        //     });
        //     const webAudioBlock = channel.subarray(0, WEBAUDIO_BLOCK_SIZE);
        //     outputs[i][j].set(webAudioBlock);
        // }));
        for (let i = 0; i < this.numberOfOutputs; i++) {
            for (let j = 0; j < this.outputBuffers[i].length; j++) {
                for (let k = 0; k < this.blockSize; k++) {
                    this.outputBuffers[i][j][k] += this.outputBuffersToRetrieve[i][j][k] / this.nbOverlaps;
                }
            }
        }
        // this.writeOutputs(outputs);
        // Write next web audio block from output buffers
        for (let i = 0; i < this.numberOfInputs; i++) {
            for (let j = 0; j < this.inputBuffers[i].length; j++) {
                const webAudioBlock = this.outputBuffers[i][j].subarray(0, WEBAUDIO_BLOCK_SIZE);
                outputs[i][j].set(webAudioBlock);
            }
        }
        // this.shiftOutputBuffers();
        // Shift left content of output buffers to receive new web audio block
        for (let i = 0; i < this.numberOfOutputs; i++) {
            for (let j = 0; j < this.outputBuffers[i].length; j++) {
                this.outputBuffers[i][j].copyWithin(0, WEBAUDIO_BLOCK_SIZE);
                this.outputBuffers[i][j].subarray(this.blockSize - WEBAUDIO_BLOCK_SIZE).fill(0);
            }
        }
        return true;
    }
    protected abstract processOLA(inputs: Float32Array[][], outputs: Float32Array[][], params: Record<string, Float32Array>): void;
}
