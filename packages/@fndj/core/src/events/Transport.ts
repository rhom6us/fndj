import { Signature } from './FnEvent';

type Transport = {
    tempo: number;
    sig: Signature;
    tracks: Array<{
        lowcut: BiquadFilterNode;
        eq: {
            low: BiquadFilterNode;
            mid: BiquadFilterNode;
            high: BiquadFilterNode;
        };
        filter: ;
    }>;

};
