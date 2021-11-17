import { SuperpoweredBuffer } from './SuperpoweredBuffer';
import { SuperpoweredGlue } from './SuperpoweredGlue';

export class SuperpoweredWebAudio {
    constructor(audioContext: BaseAudioContext, superpowered: SuperpoweredGlue);

    Superpowered: SuperpoweredGlue;
    audioContext: AudioContext;
    getUserMediaForAudio(constraints: MediaStreamConstraints, onPermissionGranted: (stream: MediaStream) => void, onPermissionDenied: (error: any) => void): void;
    getUserMediaForAudioAsync(constraints: MediaStreamConstraints): Promise<MediaStream>;
    createAudioNodeAsync<T extends AudioNode = AudioNode>(url: string, className: string, onMessageFromAudioScope: any): Promise<T>;
    /**
     *
     *
     * @template T AudioNode
     * @param {string} url The JavaScript module source of the node.
     * @param {string} className The registered processor name.
     * @param {(newNode: T) => void} callback
     * @param {*} onMessageFromAudioScope
     * @memberof SuperpoweredWebAudio
     */
    createAudioNode(url: string, className: string, callback: (newNode: SuperpoweredWebAudio.SuperpoweredNode) => void, onMessageFromAudioScope: any): void;
}
export namespace SuperpoweredWebAudio {
    abstract class SuperpoweredAudioWorkletProcessor extends AudioWorkletProcessor {
        Superpowered: SuperpoweredGlue;
        samplerate: number;

        protected abstract onReady(): void;
        protected abstract onMessageFromMainScope(message: any): void;
        protected sendMessageToMainScope(message: any): void;

        protected abstract processAudio(inputBuffer: SuperpoweredBuffer, outputBuffer: SuperpoweredBuffer, buffersize: number, parameters: Record<string, Float32Array>): boolean | void;
        process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean;
    }
    export { SuperpoweredAudioWorkletProcessor as AudioWorkletProcessor };

    export class SuperpoweredNode extends AudioWorkletNode {
        sendMessageToAudioScope(message: any, transfer?: any[]): void;
    }

}
// export { SuperpoweredBuffer, SuperpoweredGlue, SuperpoweredTrackLoader };
