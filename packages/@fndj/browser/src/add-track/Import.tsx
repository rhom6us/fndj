

import { ProgressIndicator } from '@fluentui/react';
import React, { FC, memo, useCallback, useEffect, useRef } from 'react';
import { AnalysisState, AnalysisStateData, DownloadState, DrawState, StateType, WaveformState, WaveformStateData } from './reducers';
import { Video } from './services/youtube';
import { commands } from './store';

interface Props {
    video: Video;
    state: DownloadState | AnalysisState | WaveformState | DrawState;
    // analysis: AnalysisStateData['analysis'];
}


export const Import: FC<Props> = ({ video, state }) => {
    useEffect(() => {

     }, []);
    return (
        <section>
            {/* <Stack> */}
                <button onClick={useCallback(()=>commands.addTrack.goBack(),[])}>Back</button>
                <h1>{state.download.state === 'complete' ? 'Done!' : 'downloading...'}</h1>
            <Downloading progress={state.download.progress} />
            {state.type >= StateType.analysis && <Analyzing data={(state as AnalysisState).analysis} />}
            {state.type >= StateType.waveform && <GeneratingWaveform data={(state as AnalysisState).analysis} />}
                {/* {download.state === 'complete' && <Analyzing data={analysis}  />} */}
            {/* </Stack> */}
        </section>
    );
};

interface DownloadingProps {
    readonly progress?: {
        readonly loaded: number;
        readonly total?: number;
    };
}
export const Downloading: FC<DownloadingProps> = memo(function Downloading({ progress }: DownloadingProps) {
    if (!progress || !progress.total) {
        return <ProgressIndicator />;
    }
    return <ProgressIndicator percentComplete={progress.loaded / progress.total} />;
});

interface AnalyzingProps {
    data: AnalysisStateData['analysis'];
}
export const Analyzing: FC<AnalyzingProps> = memo(function Analyzing({ data }: AnalyzingProps) {

    useEffect(() => {
        commands.addTrack.analyze();
    }, []);

    return <h1>analyzing... {data?.state}</h1>;
});

interface GeneratingWaveformProps {
    waveFormData: WaveformStateData['waveFormData'];
}
export const GeneratingWaveform: FC<AnalyzingProps> = memo(function GeneratingWaveform({ waveFormData }: GeneratingWaveformProps) {
    const ref = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const { width, height } = ref.current!.getBoundingClientRect();
        commands.addTrack.;
    }, []);

    return <canvas ref={ref} ></canvas>;
});
