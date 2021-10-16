/* eslint-disable @typescript-eslint/no-namespace */
import { Opaque } from './Opaque';
import { Seconds } from './time-units';






export type BPS = Opaque<number>;
export function BPS(value: number) {
    return value as BPS;
};
export namespace BPS {
    export function fromBPM(bpm: BPM): BPS{
        return bpm / 60 as BPS;
    }
    export function toBPM(bps: BPS): BPM{
        return bps * 60 as BPM;
    }
}


export type BPM = Opaque<number>;
export function BPM(value: number) {
    return value as BPM;
};

export namespace BPM {
    export const fromBPM = BPS.fromBPM;
    export const toBPM = BPS.toBPM;
    export function toBps(bpm: BPM) {
        return BPS(bpm / 60);
    }
    export function getBeatDuration(bpm: BPM): Seconds {
        return Seconds(60 / bpm);
    }
    export function getPlaybackRate(songBpm: BPM, playbackBpm: BPM) {
        return playbackBpm / songBpm;
    }
    export function getBeatCount(time: Seconds, bpm:BPM) {
        return time / toBps(bpm);
    }

}
