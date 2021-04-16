import React, { useMemo } from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';
import { asFloat, eventTargetFloat, eventTargetValue } from '../react-helpers/event-handlers';

interface Props {
    min: number;
    max: number;
    value: number;
    step?: number;
    valueChanged: (value: number) => void;
}
const Slide = styled.input`
-webkit-appearance: none;
width: 100%;
height: 25px;
background: #d3d3d3;
outline: none;
opacity: 0.7;
-webkit-transition: .2s;
transition: opacity .2s;
&:hover {
    opacity: 1;
}
&::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: #4CAF50;
    cursor: pointer;
}
&::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #4CAF50;
    cursor: pointer;
}
`;
export const Slider = React.memo(({ min, max, value, valueChanged, step }: Props) => {
    // const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    //     valueChanged(parseFloat(e.target.value));
    // }, [valueChanged]);



    return (
        <Slide type="range" min={min} max={max} value={value} step={step} onChange={eventTargetValue(asFloat(valueChanged))} />
    );
});
Slider.displayName = 'Slider';
