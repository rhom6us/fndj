import { Transport as MasterTransport } from 'waves-masters';
export default Transport;
/**
 * Provides synchronized scheduling of Time Engine instances.
 *
 * [example]{@link https://rawgit.com/wavesjs/waves-audio/master/examples/transport/index.html}
 *
 * @example
 * import * as audio from 'waves-masters';
 * const transport = new audio.Transport();
 * const playControl = new audio.PlayControl(transport);
 * const myEngine = new MyEngine();
 * const yourEngine = new yourEngine();
 *
 * transport.add(myEngine);
 * transport.add(yourEngine);
 *
 * playControl.start();
 */
declare class Transport extends MasterTransport {
    constructor(options?: { audioContext?: BaseAudioContext; });
    audioContext: BaseAudioContext;
}
//# sourceMappingURL=Transport.d.ts.map
