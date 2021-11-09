import { squareRootCurves } from "./square-root-curves";

export class SquareRootNode extends WaveShaperNode {
    constructor(context: BaseAudioContext, options?: Omit<WaveShaperOptions, 'oversample' | 'curve'>) {
        super(context, {
            ...options, ...{
                oversample: '4x',
                curve: squareRootCurves[40000000]
            }
        });
    }
}
