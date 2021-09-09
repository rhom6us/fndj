/* eslint-disable @typescript-eslint/no-empty-function */
import wavesUI from 'waves-ui';
import Layer from 'waves-ui/core/layer';
import { TrackStartMarkerLayer } from './track-start-marker-layer';
declare global {
    interface Event {
        shiftKey: any;
    }
}
/**
 * A state to select and edit shapes in a simple way. (kind of plug n play state)
 */
export class ZoomAndEditState extends wavesUI.states.BaseState {
    currentTarget: Element | null;
    currentEditedLayer: Layer | null;
    maxZoom: number;
    minZoom: number;
    initialZoom = 1;
    initialY = 0;
    private _pixelToExponent = wavesUI.utils.scales.linear()
        .domain([0, 100]) // 100px => factor 2
        .range([0, 1]);
    constructor(timeline: wavesUI.core.Timeline) {
        super(timeline);

        this.currentEditedLayer = null;
        this.currentTarget = null;
        // Set max/min zoom
        // maxZoom: 1px per sample
        // minZoom: 10 000 px per 1 hour
        // with a default to 44.1kHz sample rate
        this.maxZoom = 44100 * 1 / this.timeline.timeContext.pixelsPerSecond;
        this.minZoom = 10000 / 3600 / this.timeline.timeContext.pixelsPerSecond;
    }

    enter() { }
    exit() { }

    handleEvent(e: wavesUI.interactions.WaveEvent, hitLayers: wavesUI.core.Layer[]) {

        switch (e.type) {
            case 'mousedown':
                return this.onMouseDown(e);
            case 'mousemove':
                // if (hitLayers.some(p => p instanceof TrackStartMarkerLayer)) {
                //     return this.simpleEditionStateMouseMove(e);
                // }
                if (this.currentEditedLayer) {
                    return this.simpleEditionStateMouseMove(e);
                }
                return this.centeredZoomStateMouseMove(e);
            case 'mouseup':
                return this.onMouseUp();
        }
    }

    onMouseDown(e: wavesUI.interactions.WaveEvent) {
        // keep target consistent with mouse down
        this.currentTarget = e.target;

        this.layers
            .filter(layer => layer.hasElement(this.currentTarget!))
            .map((layer) => {
                if (!e.originalEvent.shiftKey) {
                    layer.unselect();
                }
                return [layer, layer.getItemFromDOMElement(this.currentTarget!)] as const;
            })
            .filter(([layer, item]) => item !== null)
            .forEach(([layer, item]) => {
                this.currentEditedLayer = layer;
                requestAnimationFrame(() => layer.select(item!));
            });


        this.initialZoom = this.timeline.timeContext.zoom;
        this.initialY = e.y;

        // this._pixelToExponent = wavesUI.utils.scales.linear()
        //     .domain([0, 100]) // 100px => factor 2
        //     .range([0, 1]);
    }

    onMouseMove(e: wavesUI.interactions.WaveEvent) {
    }
    private simpleEditionStateMouseMove(e: wavesUI.interactions.WaveEvent) {
        const layer = this.currentEditedLayer!;
        const items = layer.selectedItems;

        layer.edit(items, e.dx, e.dy, this.currentTarget!);
        requestAnimationFrame(() => layer.update(/*items*/));

    }
    private centeredZoomStateMouseMove(e: wavesUI.interactions.WaveEvent) {
        // prevent annoying text selection when dragging
        e.originalEvent.preventDefault();

        const timeContext = this.timeline.timeContext;
        const lastCenterTime = timeContext.timeToPixel.invert(e.x);
        const exponent = this._pixelToExponent(e.y - this.initialY);
        const targetZoom = this.initialZoom * Math.pow(2, exponent); // -1...1 -> 1/2...2

        timeContext.zoom = Math.min(Math.max(targetZoom, this.minZoom), this.maxZoom);

        const newCenterTime = timeContext.timeToPixel.invert(e.x);
        const delta = newCenterTime - lastCenterTime;

        // Apply new offset to keep it centered to the mouse
        timeContext.offset += (delta + timeContext.timeToPixel.invert(e.dx));


        this.timeline.tracks.update();
    }
    onMouseUp() {
        this.currentEditedLayer = null;
    }
}
