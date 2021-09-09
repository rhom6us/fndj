import { SuperpoweredWebAudio } from './SuperpoweredWebAudio';

interface Message {
    SuperpoweredLoaded: {
        buffer: ArrayBuffer,
        url: string,
    };
}

export class SuperpoweredTrackLoader {
    static downloadAndDecode(url: string, obj: SuperpoweredWebAudio.AudioWorkletProcessor | ((message: Message) => boolean)): void;
    // constructor(receiver: any);
    // receiver: any;
    // onmessage(message: any): boolean;
    // load(url: string): void;
    // transfer(arrayBuffer: ArrayBuffer, trackLoaderWorker: any): void;
}
