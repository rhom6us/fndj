export default SimpleWaveform;
/**
 * Module that display the waveform of the audio buffer. In case non-mono
 * audio files, only the left channel is rendered. For more accurate
 * representation see WaveformModule.
 *
 * @param {Object} options - Override default parameters
 * @param {String} [options.color='steelblue'] - Color of the waveform
 * @param {String} [options.overlay=false] - Display an overlay of the bottom
 *  section of the waveform.
 * @param {String} [options.overlayColor='#000000'] - Color of the overlay.
 * @param {String} [options.overlayOpacity=0.4] - Opacity of the overlay.
 */
declare class SimpleWaveform extends AbstractModule {
    constructor(options: any);
    _waveform: any;
    setTrack(buffer: any, metadata: any): void;
}
import AbstractModule from "../../src/core/AbstractModule";
//# sourceMappingURL=SimpleWaveform.d.ts.map
