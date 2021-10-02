import { SuperpoweredGlue } from '@fndj/superpowered';
import url from '@fndj/superpowered/superpowered.wasm';

export const glue = await SuperpoweredGlue.fetch(url);

glue.Initialize({
    licenseKey: 'ExampleLicenseKey-WillExpire-OnNextUpdate',
    enableAudioAnalysis: true,
    enableFFTAndFrequencyDomain: true,
    enableAudioTimeStretching: true,
    enableAudioEffects: true,
    enableAudioPlayerAndDecoder: true,
    enableCryptographics: true,
    enableNetworking: true,
});


export { glue as Superpowered };




export function analyze(audio: AudioBuffer) {
    const analyzer = new glue.Analyzer(audio.sampleRate, audio.duration);

    const superInput // = glue.createFloatArray(audio.getChannelData(0).length * audio.numberOfChannels); /*
        = new glue.Float32Buffer(audio.getChannelData(0).length * audio.numberOfChannels); //*/
    try {
        glue.bufferToWASM(superInput, audio);

        analyzer.process(superInput.pointer, audio.getChannelData(0).length, -1);

        analyzer.makeResults(
            60,   // Detected bpm will be more than or equal to this. Recommended value: 60.
            200,  // Detected bpm will be less than or equal to this. Recommended value: 200.
            0,    // If you know the bpm set it here. Use 0 otherwise.
            128,    // Provides a "hint" for the analyzer with this. Use 0 otherwise.
            true, // True: calculate beatgridStartMs. False: save some CPU with not calculating it.
            0,    // Provides a "hint" for the analyzer with this. Use 0 otherwise.
            true, // True: make overviewWaveform. False: save some CPU and memory with not making it.
            true, // True: make the low/mid/high waveforms. False: save some CPU and memory with not making them.
            true  // True: calculate keyIndex. False: save some CPU with not calculating it.
        );
        return {
            averageDb: analyzer.averageDb,
            loudpartsAverageDb: analyzer.loudpartsAverageDb,
            peakDb: analyzer.peakDb,
            bpm: analyzer.bpm,
            beatgridStartMs: analyzer.beatgridStartMs,
            keyIndex: analyzer.keyIndex,
            /* waveformSize: analyzer.waveformSize,
             get peakWaveform() {
                 return analyzer.getPeakWaveform();
             },
             averageWaveform: analyzer.getAverageWaveform(),
             // get averageWaveform(): Uint8Array {
             //     return analyzer.getAverageWaveform().array;
             // },
             get notes(): Uint8Array {
                 return analyzer.getNotes().array;
             },
             spectrum: {
                 high: analyzer.getHighWaveform(),
                 mid: analyzer.getMidWaveform(),
                 low: analyzer.getLowWaveform(),
                 // get high(): Uint8Array {
                 //     return analyzer.getHighWaveform().array;
                 // },
                 // get mid(): Uint8Array {
                 //     return analyzer.getMidWaveform().array;
                 // },
                 // get low(): Uint8Array {
                 //     return analyzer.getLowWaveform().array;
                 // },
             }*/
        };
    } finally {
        superInput.free();
    }

}
