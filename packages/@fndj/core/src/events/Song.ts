import { Measure, minutes, seconds as Seconds, Time } from 'safe-units';


const Beats = Measure.dimension("beats");
type Beats = typeof Beats;

function beats(value: number): Beats{
    return Measure.of(value, Beats);
}

const Tempo = Beats.over(Time);
type Tempo = typeof Tempo;
function tempo(value: number): Tempo{
    return Measure.of(value, Tempo);
}

export const BPM: Tempo = Beats.per(minutes).withSymbol("BPM");

export type BPM = typeof BPM;
function bpm(value: number): BPM {
    return beats(value).over(minutes);
}

const Bars = Measure.of(4, Beats, 'Bar');
function bars(value: number) {
    return Measure.of(value, Bars);
}
function seconds(value: number) {
    return Measure.of(value, Seconds);
}
const minTempo = Measure.of(60, BPM);

seconds(34).value / minutes.value;
const pos = bars(63).plus(beats(3)).over(seconds(34));


type BPS = number;
