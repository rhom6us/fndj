import { FlexBox, FlexItem } from "react-styled-flex";
import { logger, WritablePart } from '@fndj/util';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useRef } from 'react';
import wavesUI from 'waves-ui';
import GridAxisLayer from './grid-layer';
import PrepWaveformLayer from './prep-waveform-layer';
import { TrackStartMarkerLayer } from './track-start-marker-layer';
import { ZoomAndEditState } from './zoom-and-edit-state';
import './waveform.scss';

interface Props {
    buffer: AudioBuffer;
    trackStart: number;
    trackStartChanged: (trackStart: number) => void;
    bpm: number;
}
function d<T>(a: T, ...b: Partial<WritablePart<T>>[]): T { return Object.assign(a as any, ...b); }

function initWaves($track: Element, { buffer, trackStart, trackStartChanged, bpm, size: { height, width } }: Props & { size: Required<Pick<DOMRectInit, 'height' | 'width'>>; }) {
    // const { width } = $track?.getBoundingClientRect();
    // const height = 200;

    const duration = buffer.duration * 2;

    const pixelsPerSecond = 100;//width! / duration;
    logger.count('initWaves');
    const timeline = new wavesUI.core.Timeline(pixelsPerSecond, width);
    const layerTimeContext = d(new wavesUI.core.LayerTimeContext(timeline.timeContext), {
        duration: buffer.duration,
        start: 0,//4 * 60 / bpm,
        offset: 0
    });

    // const track = new wavesUI.core.Track($track, height);
    const track = timeline.createTrack($track, height, 'main');

    const prepLayer = new PrepWaveformLayer(buffer, { height });
    prepLayer.setTimeContext(layerTimeContext);
    track.add(prepLayer);


    const cursorLayer = new wavesUI.helpers.CursorLayer({ height });
    cursorLayer.setTimeContext(layerTimeContext);



    const gridAxis = new GridAxisLayer({
        height,
        top: 0,//height + 10,
        bpm,
        signature: '4/4',
        color: 'orange',
        trackStart,
        offset: 0,
    });
    gridAxis.setTimeContext(timeline.timeContext);
    track.add(gridAxis);

    const markerLayer = new TrackStartMarkerLayer(trackStart, trackStartChanged, { height });
    markerLayer.setTimeContext(layerTimeContext);
    track.add(markerLayer);


    // timeline.state = new wavesUI.states.SimpleEditionState(timeline);
    //   timeline.state = new wavesUI.states.CenteredZoomState(timeline);
    timeline.state = new ZoomAndEditState(timeline);

    // timeline.add(track);

    timeline.tracks.render();
    timeline.tracks.update();
    return { timeline, markerLayer, gridAxis };
}
export const Waveform: React.FC<Props> = ({ buffer, trackStart, trackStartChanged, bpm }: Props) => {
    const trackRef = useRef<HTMLDivElement>(document.createElement('div'));
    const rootRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<ReturnType<typeof initWaves>>();

    let [size, setSize] = useState(DOMRectReadOnly.fromRect({ width: NaN, height: 400 }));
    const cb = useCallback((node: HTMLElement) => {
        const sz = node.getBoundingClientRect();
        const bodyHeight = document.querySelector('body')!.getBoundingClientRect().height;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setSize(size = DOMRectReadOnly.fromRect({ ...JSON.parse(JSON.stringify(sz)), height: 400 }));

    }, []);

    useLayoutEffect(() => {
        cb(rootRef.current!);
    }, [cb]);
    useEffect(() => {
        const handler = () => cb(rootRef.current!);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, [cb]);
    useLayoutEffect(() => {
        const $track = trackRef.current;
        const $root = rootRef.current!;
        $root.querySelector('h4')!.remove();
        $root.appendChild($track);

        return () => {
            $track.remove();
            $root.append(d(document.createElement('h4'), { innerText: 'waves are coming' }));
        };
    }, []);
    useEffect(() => {
        const $root = rootRef.current,
            $track = trackRef.current;
        if (!$root || !$track) {
            logger.error(`wtf mate??? i thought this couldn't happen!?`);
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
        const timeline = initWaves($track, { buffer, trackStart, trackStartChanged, bpm, size });
        timelineRef.current = timeline;
        return () => timeline.timeline.tracks.forEach(track => track.destroy());

    }, [buffer/*, trackStart, trackStartChanged*/]);  // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        const waves = timelineRef.current!;
        waves.markerLayer.position = trackStart;
        waves.gridAxis.trackStart = trackStart;
    }, [trackStart]);
    useEffect(() => {
        const waves = timelineRef.current!;
        waves.gridAxis.bpm = bpm;
    }, [bpm]);


    const period = 60 / bpm;
    const style = {
        backgroundColor: 'black',
        // height: CSS.vh(100).toString()
    };
    return (
        <article>
            <h3>trackStart: {(trackStart / period).toFixed(2)}</h3>
            <section ref={rootRef} style={style}>
                <h4>heres some waves...</h4>
            </section>
        </article>
    );
};
