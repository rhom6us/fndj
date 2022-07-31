

import { ProgressIndicator } from '@fluentui/react';
import { Video } from '@rhombus/gapi/lib/youtube';
import React, { FC, memo, useCallback, useEffect, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { useCanvas } from '../hooks';
import { AnalysisState, AnalysisStateData, DownloadState, DrawingState, StateType, WaveformState } from './reducers';
import { commands } from './store';

interface Props {
    video: Video;
    state: DownloadState | AnalysisState | WaveformState | DrawingState;
    // analysis: AnalysisStateData['analysis'];
}

export const Import: FC<Props> = ({ video, state }) => {
    const once = useRef(false);
    useEffect(() => {
        if (state.download.state === 'complete')
            if (!once.current) {
                once.current = true;
                commands.addTrack.analyze();
            }
    }, [state.download.state]);

    return (
        <section>
            {/* <Stack> */}
            <button onClick={useCallback(() => commands.addTrack.goBack(), [])}>Back</button>
            <h1>{state.download.state === 'complete' ? 'Done!' : 'downloading...'}</h1>
            {state.download.state === 'pending' && <Downloading />}
            {state.download.state !== 'pending' && <Downloading progress={state.download.progress} />}

            {/* {state.download.state === 'complete' && <Analyzing data={analysis}  />} */}
            {state.type >= StateType.analysis && <Analyzing analysis={(state as AnalysisState).analysis} />}
            {state.type >= StateType.waveform && <GeneratingWaveform waveformImageData={(state as DrawingState).waveformImageData} />}

            {/* </Stack> */}
        </section>
    );
};

interface DownloadingProps {
    readonly progress?: undefined | {
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
    analysis: AnalysisStateData['analysis'];
}
export const Analyzing: FC<AnalyzingProps> = memo(function Analyzing({ analysis }: AnalyzingProps) {
    const once = useRef(false);
    useEffect(() => {
        if (analysis.state === 'complete')
            if (!once.current) {
                once.current = true;
                commands.addTrack.startWaveform();
            }
    }, [analysis.state]);


    return (
        <h1>analyzing... {analysis?.state}</h1>);
});

interface GeneratingWaveformProps {
    waveformImageData: DrawingState['waveformImageData'];
    progress: number;
}
let wait = false;
export const GeneratingWaveform: FC<GeneratingWaveformProps> = memo(function GeneratingWaveform({ waveformImageData, progress }: GeneratingWaveformProps) {

    const { width, height, ref, } = useResizeDetector<HTMLCanvasElement>({ handleHeight: false })!;
    // const w = useMemo(() => waveformImageData.length, [waveformImageData]);
    // useEffect(() => {
    //     console.log({ width, height, w });
    // }, [width, height, w]);
    // useEffect(() => {
    //     const samplesPerPixel = buffer.length / width!;
    //     commands.addTrack.updateWaveform(samplesPerPixel);
    // }, [buffer, width]);
    useCanvas(ref, (ctx) => {
        // ctx.scale(1, -1);
        // ctx.translate(0, -(height ?? 200) / 2);

        //y-axis is now -100 to 100, right side up
        ctx.clearRect(0, 0, 500, 201);
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.moveTo(0, 100);
        // ctx.lineTo(1, 50);
        // ctx.lineTo(50, 50);
        // ctx.lineTo(50, 150);
        // ctx.lineTo(1, 150);
        // ctx.lineTo(1, 50);
        waveformImageData.forEach(([min, max], x) => {
            ctx.lineTo(x, max);
        });
        ctx.lineTo(100, 500);
        waveformImageData.reverse().forEach(([min, max], x) => {
            ctx.lineTo(waveformImageData.length - x, min);
        });
        ctx.lineTo(0, 100);
        ctx.fill();
        // ctx.fillRect(10, 10, 150, 100);
        return;
        // const data = new Int32Array(waveformImageData);
        // const udata = new Uint8ClampedArray(waveformImageData);
        // const imagedata = new ImageData(udata.slice(), data.length / 201);
        // ctx.putImageData(imagedata, 0, 0);
        // if (!wait) {
        //     console.log(imagedata);
        //     wait = true;
        //     setTimeout(() => void (wait = false), 5000);
        // }
        // return;

    }, [waveformImageData]);


    return <div>
        <ProgressIndicator percentComplete={progress} />
        <canvas
            ref={ref}
            height={201}
            width={window.document.body.getBoundingClientRect().width}
            style={{
                width: CSS.px(window.document.body.getBoundingClientRect().width).toString(),
                height: CSS.px(201).toString()
            }}>
        </canvas>;
    </div>;
});
