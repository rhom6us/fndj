export interface FnPlayerInit {
    readonly audioContext: BaseAudioContext;
    readonly buffer: AudioBuffer;
    readonly destination: AudioNode;
}
export abstract class FnPlayer implements FnPlayerInit {
    readonly audioContext: BaseAudioContext;
    readonly buffer: AudioBuffer;
    readonly destination: AudioNode;

    static create(init: FnPlayerInit, position = 0) {
        return new FnPausedPlayer(position, init);
    }
    protected constructor({ audioContext, buffer, destination }: FnPlayerInit) {
        this.audioContext = audioContext;
        this.buffer = buffer;
        this.destination = destination;
    }

    abstract play(): FnPlayingPlayer;
    abstract pause(): FnPausedPlayer;
}
class FnPausedPlayer extends FnPlayer {
    public position: number;
    constructor(position: number, init: FnPlayerInit) {
        super(init);
        this.position = position;
    }
    override play() {
        const sourceNode = new AudioBufferSourceNode(this.audioContext, { buffer: this.buffer });
        sourceNode.connect(this.destination);
        sourceNode.start(0, this.position);
        sourceNode.addEventListener('ended', () => {
            sourceNode.disconnect(this.destination);
        }, { once: true, passive: true, capture: false });
        return new FnPlayingPlayer(this.audioContext.currentTime - this.position, sourceNode, this);
    }

    override pause() {
        return this;
    }
}
class FnPlayingPlayer extends FnPlayer {
    private readonly startTime: number;
    private readonly sourceNode: AudioScheduledSourceNode;
    public get position() {
        return this.audioContext.currentTime - this.startTime;
    }
    constructor(startTime: number, sourceNode: AudioScheduledSourceNode, init: FnPlayerInit) {
        super(init);
        this.startTime = startTime;
        this.sourceNode = sourceNode;
    }
    play() {
        return this;
    }
    pause() {
        this.sourceNode.stop();
        const position = this.audioContext.currentTime - this.startTime;
        return new FnPausedPlayer(position, this);
    }
}
