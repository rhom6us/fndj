
/** Overlap-Add Node */
export class OLAProcessor {
    constructor(options: any);
    nbInputs: any;
    nbOutputs: any;
    blockSize: any;
    hopSize: number;
    nbOverlaps: number;
    inputBuffers: any[];
    inputBuffersHead: any[];
    inputBuffersToSend: any[];
    outputBuffers: any[];
    outputBuffersToRetrieve: any[];
    /** Handles dynamic reallocation of input/output channels buffer
     (channel numbers may vary during lifecycle) **/
    reallocateChannelsIfNeeded(inputs: any, outputs: any): void;
    allocateInputChannels(inputIndex: any, nbChannels: any): void;
    allocateOutputChannels(outputIndex: any, nbChannels: any): void;
    /** Read next web audio block to input buffers **/
    readInputs(inputs: any): void;
    /** Write next web audio block from output buffers **/
    writeOutputs(outputs: any): void;
    /** Shift left content of input buffers to receive new web audio block **/
    shiftInputBuffers(): void;
    /** Shift left content of output buffers to receive new web audio block **/
    shiftOutputBuffers(): void;
    /** Copy contents of input buffers to buffer actually sent to process **/
    prepareInputBuffersToSend(): void;
    /** Add contents of output buffers just processed to output buffers **/
    handleOutputBuffersToRetrieve(): void;
    process(inputs: any, outputs: any, params: any): boolean;
    processOLA(inputs: any, outputs: any, params: any): void;
}
