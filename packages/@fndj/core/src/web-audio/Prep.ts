import { audioContext } from '@rhombus/audio-context';
import { logger } from '@rhombus/logger';
import * as waves from 'waves-audio';

// const transport = new Transport();
// const controller = new PlayControl(transport);
// const metrenome = new Metronome({ period: 1 / 128 });

// declare const buffer: AudioBuffer;
// const bufferPlayer = new PlayerEngine(buffer);

// transport.add(metrenome);
// transport.add(bufferPlayer);

// controller.start();

// metrenome.period = 1 / 130;

export class Prep {
    private readonly transport: waves.Transport;
    private readonly controller: waves.PlayControl;
    private readonly metronome: waves.Metronome;
    private readonly playEngine: waves.PlayerEngine;
    constructor(url?: string) {
        const transport = new waves.Transport({ audioContext } as any);
        this.transport = transport;
        this.controller = new waves.PlayControl(transport);
        this.metronome = new waves.Metronome({ period: 60 / 128 });
        // this.metronome.phase = 1.6599095705;
        this.playEngine = new waves.PlayerEngine();
        const ctx = this.playEngine.audioContext;
        this.metronome.connect(ctx.destination);
        this.playEngine.connect(ctx.destination);
        transport.add(this.metronome);
        transport.add(this.playEngine, 0, this.playEngine.audioTime, -0.77875);// -.774);//-0.7780826111999999);// -0.69 * this.metronome.period);

    }
    get isPlaying() {
        return this.controller.running;
    }

    set _period(value: number) {
        this.metronome.period = value;
    }
    get _period() {
        return this.metronome.period;
    }
    get tempo() {
        return 60 / this._period;
    }
    set tempo(value: number) {
        this._period = 60 / value;
    }

    set buffer(value: AudioBuffer) {
        this.playEngine.buffer = value;
    }
    get buffer() {
        return this.playEngine.buffer;
    }
    async load(url: string) {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audio = await this.playEngine.audioContext.decodeAudioData(arrayBuffer);
        this.buffer = audio;
    }
    set metronomeOffset(seconds: number) {
        // this.metronome.phase = seconds / this._period;
    }
    get metronomeOffset() {
        return this.metronome.phase * this._period;
    }

    play() {
        logger.log('calling start');
        return this.controller.start();
    }
    pause() {
        return this.controller.pause();
    }
    toggle() {
        if (this.controller.running) {
            this.controller.stop();
        } else {
            this.controller.start();
        }
    }

    seek(seconds: number) {
        return this.controller.seek(seconds);
    }
    stop() {
        return this.controller.stop();
    }
}
