/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {AudioBufferLoader} from 'waves-loaders';
import { usePromise } from '../hooks/use-promise';
import metadata from './metadata.json';
import { RenderElement } from './render-element';


export const PreProcess: React.FC = () => {
    // const [trackIndex] = useState(0);
    const buffers = usePromise(()=>new AudioBufferLoader().load(metadata.map(p => p.buffer)),[],[]);
    console.log(buffers.length);

    const container = useRef(document.createElement('div'));

    // const block = useMemo(()=> new blocks.core.Block({
    //     player: blocks.player.SimplePlayer,
    //     container:container.current,
    //     sizing: 'manual',
    //     width: 1000,
    //     height: 100,
    // }), [container]);
    // const [waveform, cursor, zoom] = useMemo(() => [
    //     new blocks.module.Waveform({ channels: 'all' }),
    //     new blocks.module.Cursor(),
    //     new blocks.module.Zoom({ scrollBarContainer: '#scroll-bar' })
// ], []);
    // useEffect(() => block.add(waveform, 0), [block, waveform]);
    // useEffect(() => block.add(cursor, 1), [block, cursor]);
    // useEffect(() => block.add(zoom, 2), [block, zoom]);

    // useLayoutEffect(() => {
    //     setTimeout(() => block.start(), 50);
    // }, [block]);
    // useEffect(() => {
    //     block.setTrack(buffers[trackIndex], metadata[trackIndex]);
    // }, [buffers, block, trackIndex]);


    return (
        <article>
            <h1>yo</h1>
            <RenderElement element={container.current} />
        </article>
    )
}
