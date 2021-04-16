import React, { FC, useEffect, useMemo, useState } from 'react';
import { Prep } from '@fndj/core';
import { useAudioBuffer } from '../hooks';
import { Waveform } from '../waves';
import { FlexBox, FlexItem } from "react-styled-flex";
import PropTypes from 'prop-types';
import { Slider } from '../general';
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
export const PreProcess = () => {
    const [buffer, bufferLoadProgress] = useAudioBuffer('https://fuckingdj.blob.core.windows.net/test/Jewelz%20%26%20Scott%20Sparks%20feat.%20Quilla%20%E2%80%93%20Unless%20We%20Forget%20(Original%20Mix).mp3');
    const prep = useMemo(() => new Prep(), []);
    const [bpm, setBpm] = useState(prep.tempo);
    const [trackStart, setTrackStart] = useState(0 * (60 / bpm) * 4);
    useEffect(() => {
        prep.tempo = ((bpm));
    }, [prep, bpm]);
    useEffect(() => {
        if (buffer) {
            prep.buffer = buffer;
        }
    }, [buffer, prep]);

    return (
        <FlexBox column>
            {!buffer && <FlexItem is={SP} alignSelf="center">loading...</FlexItem>}
            {buffer && <>
                <FlexItem grow={1}>
                    <h1>we made it</h1>
                    {isFinite(bufferLoadProgress.total) && (<strong>{bufferLoadProgress.loaded}/{ bufferLoadProgress.total} ({ bufferLoadProgress.value})</strong>)}
                    <Waveform buffer={buffer} bpm={bpm} trackStart={trackStart} trackStartChanged={setTrackStart} />
                </FlexItem>
                <FlexItem>
                    <Slider min={90} max={180} step={0.01} valueChanged={setBpm} value={bpm} />
                </FlexItem>
            </>}
        </FlexBox>
    );
};
