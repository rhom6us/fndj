import './ChannelSplitterNode.prototype.forEachOutput';
import { CheapRingBuffer } from './CheapRingBuffer';
import { absoluteValueToDBFS, getFloatTimeDomainData, maxAbs } from './helpers';
import { MeanGainNode } from './MeanGainNode';
import { squareRootCurves } from './square-root-curves';
import { SquaringNode } from './SquaringNode';

interface R128 extends AudioNode {
    getPeak(): number;
    getRMS(): [number, number];
    getShortTermLoudness(): number;
    getPSR(): number;
}
interface R128Constructor{
    prototype: R128;
    new(context: BaseAudioContext, impulseResponse:AudioBuffer):R128
}
export const R128:R128Constructor = class extends GainNode {

    readonly peakNodes: readonly [AnalyserNode, AnalyserNode];
    readonly rmsNodes: readonly [AnalyserNode, AnalyserNode];

    readonly EbuShortTermNode: AnalyserNode;
    readonly peakBuffer3Seconds = new CheapRingBuffer<number>(180);
    readonly peakHistory3Seconds = new CheapRingBuffer<number>(180);
    lastCallToGetPeak?: number;

    constructor(context: BaseAudioContext, impulseResponse: AudioBuffer) {
        super(context);


        this.EbuShortTermNode = this
            .splitChannels(2, node => node
                //first stage highpas filter
                .connect(new BiquadFilterNode(this.context, {
                    type: 'highshelf',
                    frequency: 1500,
                    Q: 1,
                    gain: 4
                }))
                //second stage highpass filter
                .connect(new BiquadFilterNode(this.context, {
                    type: 'highpass',
                    frequency: 76,
                    Q: 1
                }))
                .connect(new SquaringNode(this.context))
                .connect(new ConvolverNode(this.context, {
                    buffer: impulseResponse,
                    disableNormalization: true,
                }))
                .connect(new MeanGainNode(this.context))
            )
            .connect(new AnalyserNode(this.context, { fftSize: 2048 }));



        this.rmsNodes = this
            .splitChannels(2, node => node
                .connect(new SquaringNode(this.context))
                .connect(new ConvolverNode(this.context, {
                    disableNormalization: true,
                    buffer: impulseResponse
                }))
                .connect(new MeanGainNode(this.context))
                // Square root
                .connect(new WaveShaperNode(this.context, {
                    oversample: '4x',
                    curve: squareRootCurves[40000000]
                }))
                .connect(new AnalyserNode(this.context, {
                    fftSize: 2048
                }))
            );

        this.peakNodes = this.splitChannels(2, node => node
            .connect(new AnalyserNode(this.context, { fftSize: 32768, smoothingTimeConstant: 0 }))
        );



    }

    getPeak() {
        const peakValue = this.peakNodes.map(getFloatTimeDomainData)
            .map(maxAbs)
            .reduce((a, b) => maxAbs([a, b]));
        this.peakHistory3Seconds.push(peakValue);
        const maxOf3Seconds = maxAbs(this.peakHistory3Seconds);

        this.lastCallToGetPeak = this.context.currentTime;

        return absoluteValueToDBFS(maxOf3Seconds);
    }





    getRMS() {
        return this.rmsNodes.map(getFloatTimeDomainData).map((data, i) => data[i] * Math.SQRT2) as [number, number];
        // const [dataArrayRMS_L, dataArrayRMS_R] = this.rmsNodes.map(getFloatTimeDomainData);
        // return [
        //     absoluteValueToDBFS(dataArrayRMS_L[0] * Math.SQRT2),
        //     absoluteValueToDBFS(dataArrayRMS_R[1] * Math.SQRT2)
        // ] as const;
    }


    getShortTermLoudness() {
        const dataArrayEBU_S = getFloatTimeDomainData(this.EbuShortTermNode)[0];
        const ebu_lkfs = -0.691 + (10 * Math.log10(dataArrayEBU_S));
        return ebu_lkfs;
    }


    getPSR() {
        return this.getPeak() - this.getShortTermLoudness();
    }





}
