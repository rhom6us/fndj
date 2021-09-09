import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Prep } from '@fndj/core';
import { useAsync, useAudioBuffer, usePromise } from '../hooks';
import { Waveform } from '../waves';
import { FlexBox, FlexItem } from "react-styled-flex";
import PropTypes from 'prop-types';
import { Slider } from '../general';
import styled from 'styled-components';
import { invert } from '../react-helpers';
import { analyze, createSpectrogram } from './services';
import { clearImmediate, setImmediate } from '@fndj/util';
interface Props { }

// const FlexBoxFlexItem: FC<Partial<FlexBoxProps & FlexItemProps>> = ({ children, ...props }) => {
//     return (
//         <FlexItem is={FlexBox} {...props}>{children}</FlexItem>
//     );
// }
// eslint-disable-next-line react/prop-types
export const SP: FC = ({ children }) => {
    return <span>{children}</span>;
};
// SP.propTypes = {
//     children: PropTypes.arrayOf(PropTypes.node)
// };
const BpmDisplay = styled.strong`
    font-size: 48px;
`;
export const PreProcess = () => {
    const prep = useMemo(() => new Prep(), []);
    const [bpm, setBpm] = useState(prep.tempo);
    const [trackStart, setTrackStart] = useState(0);
    const [buffer, bufferLoadProgress] = useAudioBuffer('https://fuckingdj.blob.core.windows.net/test/Jewelz%20%26%20Scott%20Sparks%20feat.%20Quilla%20%E2%80%93%20Unless%20We%20Forget%20(Original%20Mix).mp3');
    const analysis = useMemo(() => buffer && analyze(buffer), [buffer]);
    const [spect, setSpect] = useState<any>();
    useEffect(() => {
        if (!buffer) return;
        createSpectrogram(buffer).then(setSpect);

    }, [buffer]);
    // const [_, spect] = useAsync(useCallback(async () => await createSpectrogram(buffer!), [buffer]), []);
    useEffect(() => {
        console.log({ spect });

    }, [spect]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (!analysis) return;
        (window as any).anal = analysis;
        setBpm(analysis.bpm);
        // setTrackStart(analysis.beatgridStartMs / 1000);
    }, [analysis]);

    useEffect(() => {
        prep.tempo = ((bpm));
    }, [prep, bpm]);
    useEffect(() => {
        if (buffer) {
            prep.buffer = buffer;
        }
    }, [buffer, prep]);
    useEffect(() => {
        if (!analysis) return () => { };
        const handle = setTimeout(() => {
            const val = analysis.beatgridStartMs / 1000;
            setTrackStart(val);
            console.log({ val });
        }, 1000);
        return () => handle && clearTimeout(handle);

    }, [analysis]);

    function setBpmMinorInvert(value: number) {
        setBpm(oldBpm => Math.round(oldBpm) + value);
    }
    return (
        <FlexBox column>
            {!buffer && <FlexItem is={SP} alignSelf="center">loading...</FlexItem>}
            {buffer && <>
                <FlexItem grow={1}>
                    <h1>we made it</h1>
                    {isFinite(bufferLoadProgress.total) && (<strong>{bufferLoadProgress.loaded}/{ bufferLoadProgress.total} ({ bufferLoadProgress.value})</strong>)}
                    <Waveform buffer={buffer} bpm={bpm} trackStart={trackStart} trackStartChanged={setTrackStart} />
                </FlexItem>
                <FlexItem grow={1}>
                    <h1>we made it again</h1>
                    <canvas ref={canvasRef} />
                </FlexItem>
                <FlexItem>
                    <FlexBox>
                        <FlexItem>
                            <BpmDisplay>
                                {bpm.toFixed(3)}
                            </BpmDisplay>
                        </FlexItem>
                        <FlexItem grow={1}>
                            <FlexBox column>
                                <FlexItem>
                                    <Slider min={-180} max={-90} step={0.001} valueChanged={invert(setBpm)} value={-bpm} />
                                </FlexItem>
                                <FlexItem>
                                    <Slider min={-.5} max={.5} step={0.001} valueChanged={invert(setBpmMinorInvert)} value={-((bpm - Math.round(bpm)))} />
                                </FlexItem>

                            </FlexBox>
                        </FlexItem>
                    </FlexBox>
                </FlexItem>
            </>}
        </FlexBox>
    );
};
