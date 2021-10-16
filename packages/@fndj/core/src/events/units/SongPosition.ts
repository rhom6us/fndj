/* eslint-disable @typescript-eslint/no-namespace */

import { BPM, Seconds } from '.';
import { intDiv } from './integer-division';
import { Signature } from './Signature';

export type BarSpan = readonly [measure: number, beat: number];
export function BarSpan(...args: BarSpan): BarSpan {
    return Object.freeze(args);
}
export namespace BarSpan {
    export const ZERO = BarSpan(0, 0);
    export function fromBeats(beats: number, [beatsPerBar] = Signature.COMMON_TIME):BarSpan {
        return BarSpan(...intDiv(beats, beatsPerBar));
    }
    export function toBeats([bars, beats]: BarSpan, [beatsPerBar] = Signature.COMMON_TIME) {
        return bars * beatsPerBar + beats;
    }
    export function fromTime(time: Seconds, bpm: BPM, signature = Signature.COMMON_TIME):BarSpan {
        const beatCount = time / BPM.getBeatDuration(bpm);
        return BarSpan.fromBeats(beatCount, signature);
    }
    export function toTime(position: BarSpan, bpm: BPM, signature = Signature.COMMON_TIME): Seconds {
        return Seconds(toBeats(position, signature) * BPM.getBeatDuration(bpm));
    }
    export function subtract(left: BarSpan, right: BarSpan, signature = Signature.COMMON_TIME) {
        return BarSpan.fromBeats(BarSpan.toBeats(left, signature) - BarSpan.toBeats(right, signature));
    }

    export function lt(left: BarSpan, right: BarSpan) {
        if (left[0] === right[0]) {
            return left[1] < right[1];
        }
        return left[0] < right[0];
    }
    export function gt(left: BarSpan, right: BarSpan) {
        if (left[0] === right[0]) {
            return left[1] > right[1];
        }
        return left[0] > right[0];
    }
    export function eq(left: BarSpan, right: BarSpan) {
        return left[0] === right[0] &&
            left[1] === right[1];
    }

    export function gte(left: BarSpan, right: BarSpan) {
        return gt(left, right) || eq(left, right);
    }
    export function lte(left: BarSpan, right: BarSpan) {
        return lt(left, right) || eq(left, right);
    }


}
