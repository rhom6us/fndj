import { Pointer } from '../Pointer';
import { SuperpoweredBuffer } from '../SuperpoweredBuffer';

export declare class Analyzer {
    constructor(sampleRate: number, seconds: number);

    /**
     *
     *
     * @param {Pointer} input Pointer to floating point numbers. 32-bit interleaved stereo input.
     * @param {number} numberOfFrames Number of frames to process.
     * @param {number} lengthSeconds 	If the audio input length may change, set this to the current length. Use -1 otherwise. If this value is not -1, this method can NOT be used in a real-time audio thread.
     * @memberof Analyzer
     */
    process(input: Pointer, numberOfFrames: number, lengthSeconds: number): void;

    makeResults(minimumBpm: number, maximumBpm: number, knownBpm: number, aroundBpm: number, getBeatgridStartMs: boolean, aroundBeatgridStartMs: number, makeOverviewWaveform: boolean, makeLowMidHighWaveforms: boolean, getKeyIndex: boolean): void;

    peakDb: number;
    averageDb: number;
    loudpartsAverageDb: number;
    bpm: number;
    beatgridStartMs: number;
    keyIndex: number;
    waveformSize: number;
    getPeakWaveform(): SuperpoweredBuffer<Uint8Array>;
    getAverageWaveform(): SuperpoweredBuffer<Uint8Array>;
    getLowWaveform(): SuperpoweredBuffer<Uint8Array>;
    getMidWaveform(): SuperpoweredBuffer<Uint8Array>;
    getHighWaveform(): SuperpoweredBuffer<Uint8Array>;
    getNotes(): SuperpoweredBuffer<Uint8Array>;

    overviewSize: number;
    getOverviewSize(): SuperpoweredBuffer<Uint8Array>;

    destruct(): void;

}
