


// import { WritableKeys } from '@fndj/util';
// import wavesUI from 'waves-ui';



// export class HTMLWavesElement extends HTMLElement {
//     static get observedAttributes(): WritableKeys<HTMLWavesElement>[] {
//         return ['buffer', 'height'];
//     }
//     constructor() {
//         super();
//         this.attachShadow({ mode: 'open' });
//         this.buffer = this.getAttribute('buffer')
//     }
//     attributeChangedCallback<TKey extends keyof this>(attrName: TKey, oldVal: this[TKey], newVal: this[TKey]) {
//         this[attrName] = newVal;
//     }
//     connectedCallback() {
//         this.shadowRoot?.appendChild(this.$el);
//     }
//     $el = document.createElement('div');
//     buffer?: AudioBuffer;
//     get height() {
//         return this.#waveformLayer?.params.height;
//     }

//     get width() {
//         return this.getBoundingClientRect().width;
//     }

//     #timeline?: wavesUI.core.Timeline;
//     #waveformLayer?: wavesUI.core.Layer;
//     initWavesUi(buffer: AudioBuffer) {
//         // this.dispatchEvent(new CustomEvent(`checked-changed`, {
//         //     detail: { something: 'interesting' }, bubbles: false
//         //   }));
//         const duration = buffer.duration * 2;
//         const pixelsPerSecond = this.width / duration;
//         const timeline = new wavesUI.core.Timeline(pixelsPerSecond, this.width);
//         const track = new wavesUI.core.Track(this.$el, this.height);

//         const waveformLayer = new wavesUI.core.Layer('entity', buffer.getChannelData(0), {
//             height: height,
//             yDomain: [-1, 1]
//         });

//         const timeContext = new wavesUI.core.LayerTimeContext(timeline.timeContext);
//         timeContext.duration = buffer.duration;
//         timeContext.start = 1;

//         waveformLayer.setTimeContext(timeContext);
//         waveformLayer.configureShape(wavesUI.shapes.Waveform, {
//             y: function (d) { return d; },
//         }, {
//             color: 'steelblue'
//         });
//         // as the waveform is an `entity` layer, we have to edit the context directly
//         waveformLayer.setContextEditable(true);

//         timeline.state = new wavesUI.states.ContextEditionState(timeline);

//         track.add(waveformLayer);
//         timeline.add(track);

//         return timeline;
//         timeline.tracks.render();
//         timeline.tracks.update();
//     }


// }
// window.customElements.define('waves-ui', HTMLWavesElement);
