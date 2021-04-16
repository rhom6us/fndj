
import { Signature, gridAxisGenerator } from './grid-generator';
import wavesUI from 'waves-ui';

export interface Options {
    height: number,
    top: number,
    bpm: number,
    signature: Signature,
    color: string,
    trackStart: number,
    offset: number;
}
export default class GridAxisLayer extends wavesUI.axis.AxisLayer {
    get options() {
        return this.params as any as Options;
    }
    get trackStart() {
        return this.options.trackStart;
    }

    set trackStart(value) {
        this.options.trackStart = value;
        this.reset();
    }

    get bpm() {
        return this.options.bpm;
    }
    set bpm(bpm) {
        this.options.bpm = bpm;
        this.reset();
    }
    constructor(_options: Partial<Options>) {
        const options = {
            color: 'steelblue',
            bpm: 60,
            signature: '4/4' as Signature,
            trackStart: 0,
            offset: 0,
            ..._options
        };

        super(gridAxisGenerator(options.bpm, options.signature, options.trackStart, options.offset), options);

        this.configureShape(wavesUI.shapes.Ticks, {}, {
            color: options.color
        });
    }

    private reset() {
        this.generator = gridAxisGenerator(this.options.bpm, this.options.signature, this.options.trackStart, this.options.offset);
        this.update();
    }
}
