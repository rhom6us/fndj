import { audioContext } from '@fndj/core';
import fnMeterUrl from '@fndj/core/src/web-audio/FnMeter/FnMeter.worklet.ts';
import { setImmediateAsync } from '@rhombus/async-timers';
import React from 'react';
import { render } from 'react-dom';
import './global.scss';
import { Root } from './Root';
audioContext.audioWorklet.addModule(new URL(fnMeterUrl));

const div = document.body.appendChild(document.createElement('app'));


await setImmediateAsync();
render(
    <Root />
    , div
);
