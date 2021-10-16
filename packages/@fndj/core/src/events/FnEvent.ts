export abstract class FnEvent {
    readonly scheduledTime: number;
    constructor(scheduledTime: number) {
        this.scheduledTime = scheduledTime;
    }
    compareTo(other: FnEvent) {
        return this.scheduledTime < other.scheduledTime;
    }
}

export class StartTrackEvent extends FnEvent {
    constructor(scheduledTime: number,
        public readonly url: URL,
        public readonly offsetSeconds: number,
        public readonly songTempo: number,
        public readonly playbackTempo: number,
    ) {
        super(scheduledTime);
    }
}
interface IScheduledEvent {
    readonly startTime: number;
}
interface IInstantaneousEvent {
    wtf?: number;
}
interface ITweenedFnEvent {
    tween: 'ramp' | 'exponential';
    endTime: number;
}


interface IFnEventBase {

    readonly startTime: number;
}
interface IEqEventBase extends IFnEventBase {
    readonly q: number;
    readonly freq: number;
}
interface IEqEvent1 {
    type:
}
interface IEqEvent2 {
    type: 'lowshelf' | 'highshelf' | 'peaking';
    gain: number;
}
type EqTypes1 = { readonly type: 'lowpass' | 'highpass' | 'bandpass' | 'notch' | 'allpass'; readonly gain?: never; };
type Eqtypes2 = { readonly type: 'lowshelf' | 'highshelf' | 'peaking', readonly gain: number; };
type EqType = EqTypes1 | Eqtypes2;


type SchedType1 = { readonly endTime?: never; readonly ramp?: 'instant'; };
type SchedType2 = { readonly endTime: number; readonly ramp: 'linear' | 'exponential'; };
type SchedType = SchedType1 | SchedType2;// | Never<SchedType2>;

type EqCommon = {
    readonly startTime: number;
    readonly q: number;
    readonly freq: number;
};
type FnEqEvent = EqCommon & EqType & SchedType;

function execEq(audioContext: BaseAudioContext, e:FnEqEvent) {
    const eq = new BiquadFilterNode(audioContext, {
        Q: e.q,
        type: e.type,
    });

}
