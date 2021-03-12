export default Waveform;
/**
 * Module that display the waveform of the audio buffer.
 *
 * @param {Object} options - Override default parameters
 * @param {String} [options.color='steelblue'] - Color of the waveform
 * @param {Array|String} [options.channels=[0]] - Array describing the channels to displays,
 *  'all' to display all the channels. By default display only the left channel.
 */
declare class Waveform extends AbstractModule {
    constructor(options: any);
    _waveforms: Set<any>;
    setTrack(buffer: any, metadatas: any): void;
    _clear(): void;
}
import AbstractModule from "../core/AbstractModule";
//# sourceMappingURL=Waveform.d.ts.map