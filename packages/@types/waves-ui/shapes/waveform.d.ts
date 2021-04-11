import BaseShape, { Accessor, DatumAccessor } from "./base-shape";

export interface WaveformAccessor<T> extends Accessor<T> {
}

export interface WaveformOptions {
    sampleRate: number;
    color: string;
    opacity: number;
    // renderingStrategy: 'svg' // canvas is bugged (translation, etc...)
}

/**
 * A shape to display a waveform. (for entity data)
 *
 * [example usage](./examples/layer-waveform.html)
 *
 * @todo - fix problems with canvas strategy.
 */
export default class Waveform extends BaseShape {
}
