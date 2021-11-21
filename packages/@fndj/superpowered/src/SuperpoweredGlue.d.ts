import { AdvancedAudioPlayer, Analyzer, TimeStretching } from './mods';
import { Pointer } from './Pointer';
import { SuperpoweredBuffer, SuperpoweredBufferConstructor } from './SuperpoweredBuffer';
// import { AdvancedAudioPlayer, Analyzer, TimeStretching } from './wasm-modules';
// import { SuperpoweredGlue as SuperpoweredGlueModules } from './wasm-modules';

// export interface SuperpoweredGlueStatic {

// }
// export const SuperpoweredGlue: SuperpoweredGlueStatic;
// export type SuperpoweredGlue = SuperpoweredGlueMain & SuperpoweredGlueModules;
export class SuperpoweredGlue {
    /* @internal */
    static fetch(url: any): Promise<SuperpoweredGlue>;

    // I think this is replaced by 'linearMemory'
    // buffer: ArrayBufferLike;

    /* @internal */
    loadFromArrayBuffer(wasmCode: ArrayBuffer, afterWASMLoaded?: { afterWASMLoaded: () => void; }): Promise<void>;
    /* @private */
    wasmCode: unknown;
    /* @private */
    __maxChannels__: unknown;
    bufferToWASM(buffer: SuperpoweredBuffer, input: AudioBuffer | [[Float32Array, Float32Array]]): void;
    bufferToWASM(buffer: SuperpoweredBuffer, output: AudioBuffer | [[Float32Array, Float32Array]]): void;
    arrayBufferToWASM(arrayBuffer: ArrayBuffer, offset?: number): Pointer;
    copyWASMToArrayBuffer(pointer: Pointer, lengthBytes: number): ArrayBuffer;
    moveWASMToArrayBuffer(pointer: Pointer, lengthBytes: number): ArrayBuffer;
    /* @internal */
    Initialize(options: {
        licenseKey: string,
        enableAudioAnalysis: boolean,
        enableFFTAndFrequencyDomain: boolean,
        enableAudioTimeStretching: boolean,
        enableAudioEffects: boolean,
        enableAudioPlayerAndDecoder: boolean,
        enableCryptographics: boolean,
        enableNetworking: boolean;
    }): void;

    /**
     *
     *
     * @param {number} size Word length of the array, not the byte length.
     * @returns {Pointer}
     * @memberof SuperpoweredGlueMain
     * @example
     * let length = 128;                  // We want the buffer to store 128 floating point numbers.
     * let pointer = Superpowered.malloc(length * 4); // A floating point number is 4 bytes, therefore we allocate length * 4 bytes of memory.
     * // You can use "pointer" to pass audio to most Superpowered APIs.
     *
     * // Maybe we want to directly manipulate this data from JavaScript as well. Let's create a Float32Array view of this region.
     * let arrayView = new Float32Array(
     *   Superpowered.linearMemory, // Standard WebAssembly Module access to the Linear Memory buffer as floating point numbers.
     *   pointer,                   // The allocated region.
     *   length                     // The length of the region.
     * );
     *
     * //// If you want to "convert" the returned pointer to a JavaScript Float32Array, do this:
     * //let jsArray = new Float32Array(
     * // Superpowered.buffer, // Linear memory buffer of the Superpowered module instance.
     * // output,              // This linear memory index was returned by delay.process().
     * // 128 * 2              // Number of frames multiplied by the number of channels. In this example, 128 * 2.
     * //);
     *
     * // Now this is possible:
     * arrayView[0] = 0.5;
     *
     * // Deallocate the region when we don't need it anymore.
     * Superpowered.free(pointer);
     *
     */
    malloc(size: number): Pointer;

    /**
     * Most Superpowered APIs work on arrays of floating point numbers representing PCM audio. A simple buffer containing audio input for example. But WebAssembly can not access traditional JavaScript Float32Arrays directly and efficiently.
     * In the low-level memory model of WebAssembly, memory is represented as a contiguous range of untyped bytes called Linear Memory, which is a standard ArrayBuffer.
     * Memory can be "allocated" in the Linear Memory, returning with a pointer to the allocated region. This pointer can be used to represent an array of data, such as an array of floating point numbers.
     *
     * @type {ArrayBuffer}
     * @memberof SuperpoweredGlueMain
     * @example
     * let length = 128;                  // We want the buffer to store 128 floating point numbers.
     * let pointer = Superpowered.malloc(length * 4); // A floating point number is 4 bytes, therefore we allocate length * 4 bytes of memory.
     * // You can use "pointer" to pass audio to most Superpowered APIs.
     *
     * // Maybe we want to directly manipulate this data from JavaScript as well. Let's create a Float32Array view of this region.
     * let arrayView = new Float32Array(
     *   Superpowered.linearMemory, // Standard WebAssembly Module access to the Linear Memory buffer as floating point numbers.
     *   pointer,                   // The allocated region.
     *   length                     // The length of the region.
     * );
     * // Now this is possible:
     * arrayView[0] = 0.5;
     *
     * // Deallocate the region when we don't need it anymore.
     * Superpowered.free(pointer);
     *
     */
    linearMemory: ArrayBuffer;

    niceSize(bytes: any): string;
    createFloatArray(length: number): SuperpoweredBuffer<Float32Array>;
    id: number;
    Uint8Buffer: SuperpoweredBufferConstructor<Uint8Array>;
    Int8Buffer: SuperpoweredBufferConstructor<Int8Array>;
    Uint16Buffer: SuperpoweredBufferConstructor<Uint16Array>;
    Int16Buffer: SuperpoweredBufferConstructor<Int16Array>;
    Uint32Buffer: SuperpoweredBufferConstructor<Uint32Array>;
    Int32Buffer: SuperpoweredBufferConstructor<Int32Array>;
    BigUint64Buffer: SuperpoweredBufferConstructor<BigUint64Array>;
    BigInt64Buffer: SuperpoweredBufferConstructor<BigInt64Array>;
    Float32Buffer: SuperpoweredBufferConstructor<Float32Array>;
    Float64Buffer: SuperpoweredBufferConstructor<Float64Array>;


    // export interface SuperpoweredGlue {

    TimeStretching: typeof TimeStretching;// { new(sampleRate: number, minimumRate: number, sound: 0 | 1 | 2): TimeStretching; };
    AdvancedAudioPlayer: typeof AdvancedAudioPlayer;
    Analyzer: typeof Analyzer;
    //     // updateBuffer(buffer: any, arraybuffer: any): void;
    // }
}
