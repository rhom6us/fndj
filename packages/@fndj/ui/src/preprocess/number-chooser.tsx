/* eslint-disable react/prop-types */
import React, { ChangeEventHandler } from 'react';
type Props = {
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
};


export const NumberChooser: React.FC<Props> = ({ value, min, max, step, onChange }) => {
    function incr(power: number) {
        const inc = Math.sign(power) * step * 10 ** Math.abs(power);
        return () => {
            const newValue = Math.min(max, Math.max(min, value + inc));
            onChange(newValue);
        };
    }
    return (
        <number-chooser>
            <button onClick={incr(-2)}>&lt;&lt;&lt;</button>
            <button onClick={incr(-1)}>&lt;&lt;</button>
            <button onClick={incr(-0.1)}>&lt;</button>
            <input type="text" readOnly value={value.toFixed(Math.abs(Math.floor(Math.log10(step))))} />
            {/* <input type="number" value={value.toFixed(precision)} onChange={e => onChange(+e.target.value)} {...{ step, min, max }} /> */}
            <button onClick={incr(.1)}>&gt;</button>
            <button onClick={incr(1)}>&gt;&gt;</button>
            <button onClick={incr(2)}>&gt;&gt;&gt;</button>
        </number-chooser>
    );
};
