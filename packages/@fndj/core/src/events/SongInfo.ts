/* eslint-disable @typescript-eslint/no-namespace */
import { BarSpan, BPM, Signature } from './units';
import { Seconds } from "./units/time-units";

interface TempoEvent {
    readonly position: BarSpan;
    readonly bpm: BPM;
}
export interface SongInfo {
    readonly url: URL;
    readonly firstBeatAt: Seconds;
    readonly duration: Seconds;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              readonly tempo: {
        readonly start: BPM;
        readonly events: readonly TempoEvent[]
    };
}
export namespace SongInfo {
    export function toTime(song: SongInfo, position: BarSpan, signature = Signature.COMMON_TIME) {
        const q = song.tempo.events.filter(p => BarSpan.lt(p.position, position));
        q.push({ position, bpm: BPM(NaN) });
        let last: TempoEvent = { position: BarSpan.ZERO, bpm: song.tempo.start };
        let result = 0;
        while (q?.length) {
            const current = q.shift()!;
            const elapsed = BarSpan.subtract(current.position, last.position, signature);
            result += BarSpan.toTime(elapsed, last.bpm, signature);
            last = current;
        }
        return result as Seconds;
    }
}
