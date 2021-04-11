
import type { LayerOptions, Domain } from 'waves-ui/core/layer';
import { Simplify } from '@fndj/util';
import wavesUI from 'waves-ui';

const defaults = {
    color: 'orange',
} as const;

export interface Marker {
    _time: number;
    time: number;
    text: string;
}

export class TrackStartMarkerLayer extends wavesUI.core.Layer<Marker[]> {

    private readonly _marker: Marker;
    get position() {
        return this._marker.time;
    }
    set position(time) {
        this._marker._time = time;
    }
    get text() {
        return this._marker.text;
    }
    set text(value) {
        this._marker.text = value;
    }
    constructor(initialPosition: number, setTime: (time: number) => void, _options: Partial<LayerOptions>) {
        const options = { ...defaults, ..._options };
        const marker = {
            _time: initialPosition,
            get time() {
                return this._time;
            },
            set time(value) {
                this._time = value;
                setTime(value);
            },
            text: '1/1',
        };
        super('collection', [marker], options);
        // super('entity', marker, options);
        this._marker = marker;

        this.configureShape(wavesUI.shapes.Marker, {
            x: function (datum, newValue) {
                if (newValue !== undefined) {
                    datum.time = newValue;
                }
                return datum.time;
            },
            color: () => options.color,
        });

        this.setBehavior(new wavesUI.behaviors.MarkerBehavior());

    }
}
