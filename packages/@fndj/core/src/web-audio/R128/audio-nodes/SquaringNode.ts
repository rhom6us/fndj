export interface SquaringNodeOptions extends AudioNodeOptions{
    inputGain?: number;
}

export interface SquaringNode extends AudioNode {
    inputGain: AudioParam;
}
export interface SquaringNodeConstructor {
    prototype: SquaringNode;
    new(context: BaseAudioContext, options?: SquaringNodeOptions): SquaringNode;
}

export const SquaringNode: SquaringNodeConstructor = class extends GainNode {
    private readonly squareNode: GainNode;

    get inputGain() {
        return super.gain;
    }
    constructor(context: BaseAudioContext, options?: SquaringNodeOptions) {
        super(context, {...options, gain: options?.inputGain});
        const squareNode = this.squareNode = context.createGain();
        super.connect(squareNode);
        super.connect(squareNode.gain);
        this.connect = squareNode.connect.bind(squareNode)
    }
}
