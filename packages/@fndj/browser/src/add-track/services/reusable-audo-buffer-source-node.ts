import { Func, Action } from '@rhombus-toolkit/func';
import { sequenceEquals } from './fniterable';
declare global {
    interface AudioNode {
        connect<TDest extends AudioNode>(destinationNode: TDest): TDest;
        connect<TDest extends AudioNode>(destinationNode: TDest, output: number): TDest;
        connect<TDest extends AudioNode>(destinationNode: TDest, output: number, input: number): TDest;
    }
}
// type KeysOf<T, TValue> = {
//     [K in keyof T]: T[K] extends TValue ? K : never;
// }[keyof T];
// type FunctionKeys<T> = KeysOf<T, Func>;
// type AudioParamKeys<T> = KeysOf<T, AudioParam>;


// type Cast<TIn, TOut> = TIn extends TOut ? TIn : TOut;
// type ParamConfig<TNode extends AudioNode, TFn extends FunctionKeys<AudioParam> = FunctionKeys<AudioParam>> = [name: AudioParamKeys<TNode>, fn: TFn, ...args: Parameters<AudioParam[TFn]>];
// type FunctionCall<TObj, TName extends FunctionKeys<TObj>> = readonly [TName, ...Parameters<Cast<TObj[TName], (...args:any)=>any>>]

export class ReusableAudioBufferSourceNode implements AudioBufferSourceNode {
    #sourceNode: AudioBufferSourceNode;
    // readonly #schedule: ParamConfig<AudioBufferSourceNode>[] = []; 
    readonly #outputNode: AudioNode;
    #listeners: Array<readonly [type: string, listener: AnyListener, option: boolean | AddEventListenerOptions | undefined]> = [];
    #lastStart: readonly [when: number, offset: number, duration: number | undefined] | undefined;
    #pauseOffset: number | undefined;
    constructor(context: BaseAudioContext, options?: AudioBufferSourceOptions) {
        this.#sourceNode = new AudioBufferSourceNode(context, options);
        this.#outputNode = new GainNode(context);

    }
    #rebuildSourceNode() {
        this.#sourceNode.disconnect();

        for (const listenConfig of this.#listeners) {
            this.#sourceNode.removeEventListener(...listenConfig);
        }
        this.#sourceNode = new AudioBufferSourceNode(this.context, {
            buffer: this.buffer,
            detune: this.detune.value,
            loop: this.loop,
            loopEnd: this.loopEnd,
            loopStart: this.loopStart,
            playbackRate: this.playbackRate.value,
        });
        this.#sourceNode.connect(this.#outputNode);
        for (const listenConfig of this.#listeners) {
            this.#sourceNode.addEventListener(...listenConfig);
        }
        // for(const [param, fn, ...args] of this.#schedule){
        //     this.#sourceNode[param][fn](...args);
        //     (this.#sourceNode[param][fn] as any)(...args);
        // };
    }
    // protected logScheduleCall([name, ...args]: FunctionCall<AudioBufferSourceNode, FunctionKeys<AudioBufferSourceNode>>){
    //     this.#schedule.push(args);
    // }

    get buffer() {
        return this.#sourceNode.buffer;
    }
    set buffer(value) {
        this.#sourceNode.buffer = value;
    }

    get detune() {
        return this.#sourceNode.detune;
    }

    get loop() {
        return this.#sourceNode.loop;
    }
    set loop(value) {
        this.#sourceNode.loop = value;
    }

    get loopEnd() {
        return this.#sourceNode.loopEnd;
    }
    set loopEnd(value) {
        this.#sourceNode.loopEnd = value;
    }

    get loopStart() {
        return this.#sourceNode.loopStart;
    }
    set loopStart(value) {
        this.#sourceNode.loopStart = value;
    }

    get playbackRate() {
        return this.#sourceNode.playbackRate;
    }

    get onended() {
        return this.#sourceNode.onended;
    }
    set onended(value) {
        this.#sourceNode.onended = value;
    }

    get channelCount() {
        return this.#sourceNode.channelCount;
    }
    set channelCount(value) {
        this.#sourceNode.channelCount = value;
    }


    get channelCountMode() {
        return this.#sourceNode.channelCountMode;
    }
    set channelCountMode(value) {
        this.#sourceNode.channelCountMode = value;
    }


    get channelInterpretation() {
        return this.#sourceNode.channelInterpretation;
    }
    set channelInterpretation(value) {
        this.#sourceNode.channelInterpretation = value;
    }


    get context() {
        return this.#sourceNode.context;
    }


    get numberOfInputs() {
        return this.#sourceNode.numberOfInputs;
    }


    get numberOfOutputs() {
        return this.#sourceNode.numberOfOutputs;
    }
    start(...args: [when?: number | undefined, offset?: number | undefined, duration?: number | undefined]): void {
        this.#sourceNode.start(...args);
    }
    stop(...args: [when?: number]): void {
        this.#sourceNode.stop(...args);
        this.#rebuildSourceNode();
    }


    connect<TDest extends AudioNode>(destinationNode: TDest, output?: number, input?: number): TDest;
    connect(destinationParam: AudioParam, output?: number): void;
    connect(...args: [any]) {
        return this.#outputNode.connect(...args);
    }

    disconnect(): void;
    disconnect(output: number): void;
    disconnect(destinationNode: AudioNode): void;
    disconnect(destinationNode: AudioNode, output: number): void;
    disconnect(destinationNode: AudioNode, output: number, input: number): void;
    disconnect(destinationParam: AudioParam): void;
    disconnect(destinationParam: AudioParam, output: number): void;
    disconnect(...args: []) {
        return this.#outputNode.disconnect(...args);
    }
    protected storeListener(...args: [type: string, listener: AnyListener, option: boolean | AddEventListenerOptions | undefined]) {
        this.#listeners.push(args);
        return args;
    }
    protected unstoreListener(...args: [type: string, listener: AnyListener, option: boolean | AddEventListenerOptions | undefined]) {
        this.#listeners = this.#listeners.filter(listenConfig => !sequenceEquals(listenConfig, args));
    }

    addEventListener<K extends keyof AudioScheduledSourceNodeEventMap>(type: K, listener: Listener<K>, useCapture?: boolean): void;
    addEventListener<K extends keyof AudioScheduledSourceNodeEventMap>(type: K, listener: Listener<K>, options?: AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: AddEventListenerOptions): void;
    addEventListener(...args: [type: string, listener: any, option: any]) {
        this.storeListener(...args);
        return AudioBufferSourceNode.prototype.addEventListener.apply(this.#sourceNode, args);
    }
    removeEventListener<K extends keyof AudioScheduledSourceNodeEventMap>(type: K, listener: Listener<K>, useCapture?: boolean): void;
    removeEventListener<K extends keyof AudioScheduledSourceNodeEventMap>(type: K, listener: Listener<K>, options?: EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions): void;
    removeEventListener(...args: [type: string, listener: AnyListener, option: boolean | AddEventListenerOptions | undefined]) {
        this.unstoreListener(...args);
        return AudioBufferSourceNode.prototype.removeEventListener.apply(this.#sourceNode, args);
    }

    dispatchEvent(...args: [event: Event]) {
        return this.#sourceNode.dispatchEvent(...args);
    }

}
type AnyListener = <K extends keyof AudioScheduledSourceNodeEventMap>(this: AudioBufferSourceNode, ev: AudioScheduledSourceNodeEventMap[K]) => any;
type Listener<K extends keyof AudioScheduledSourceNodeEventMap> = (this: AudioBufferSourceNode, ev: AudioScheduledSourceNodeEventMap[K]) => any;
