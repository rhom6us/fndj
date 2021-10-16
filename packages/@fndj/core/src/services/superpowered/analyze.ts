import { glue } from './glue';



export function analyze(audio: AudioBuffer) {
    const analyzer = new glue.Analyzer(audio.sampleRate, audio.duration);

    const superInput // = glue.createFloatArray(audio.getChannelData(0).length * audio.numberOfChannels); /*
        = new glue.Float32Buffer(audio.getChannelData(0).length * audio.numberOfChannels); //*/
    try {
        glue.bufferToWASM(superInput, audio);

        analyzer.process(superInput.pointer, audio.getChannelData(0).length, -1);

        analyzer.makeResults(
            60,
            200,
            0,
            128,
            true,
            0,
            true,
            true,
            true // True: calculate keyIndex. False: save some CPU with not calculating it.
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
