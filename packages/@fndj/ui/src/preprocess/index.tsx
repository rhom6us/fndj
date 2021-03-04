import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import * as blocks from 'waves-blocks';
import {AudioBufferLoader} from 'waves-loaders';
import metadata from './metadata.json';

export const PreProcess: React.FC = () => {
    const [buffers, setBuffers] = useState<AudioBuffer[]>([]);
    const [trackIndex, setTrackIndex] = useState(0);
    useEffect(() => {
        new AudioBufferLoader().load(metadata.map(p => p.buffer)).then(setBuffers);
    }, []);

    const containerContainer = useRef<HTMLDivElement>(null);
    const container = useMemo(() => document.createElement('div'), []);
    const block = useMemo(()=> new blocks.core.Block({
        player: blocks.player.SimplePlayer,
        container,
        sizing: 'manual',
        width: 1000,
        height: 100,
    }), [container]);
    useLayoutEffect(() => {
        while (containerContainer.current?.childElementCount) {
            containerContainer.current?.firstElementChild?.remove();
        }
        containerContainer.current?.appendChild(container);
        setTimeout(() => block.start(), 50);
    }, [container, containerContainer]);
    useEffect(() => {
        block.setTrack(buffers[trackIndex], metadata[trackIndex]);
    }, [buffers, block, trackIndex]);
    const waveform = useMemo(()=>new blocks.module.Waveform({ channels: 'all' }),[]);
    const cursor =  useMemo(()=>new blocks.module.Cursor(),[]);
    const zoom =  useMemo(()=>new blocks.module.Zoom({ scrollBarContainer: '#scroll-bar' }),[]);
    useEffect(() => block.add(waveform, 0), [block, waveform]);
    useEffect(() => block.add(cursor, 1), [block, cursor]);
    useEffect(() => block.add(zoom, 2), [block, zoom]);


    return (
        <div ref={containerContainer}>
        </div>
    )
}
