
import type { LayerOptions, Domain } from 'waves-ui/core/layer';
import { Simplify } from '@fndj/util';
import wavesUI from 'waves-ui';

const defaults = {
    yDomain: [-1, 1] as Domain,
    channel: 0,
    color: 'steelblue',
    renderingStrategy: 'svg'
} as const;



export default class PrepWaveformLayer extends wavesUI.core.Layer {

    constructor(buffer: AudioBuffer, _options: Partial<LayerOptions>) {
        const options = { ...defaults, ..._options };

        super('entity', buffer.getChannelData(options.channel), options);


        this.configureShape(wavesUI.shapes.Waveform, {
            y: d => d,
        }, {
            sampleRate: buffer.sampleRate,
            color: options.color,
            renderingStrategy: options.renderingStrategy
        });
        // as the waveform is an `entity` layer, we have to edit the context directly
        this.setContextEditable(true);
    }
}
