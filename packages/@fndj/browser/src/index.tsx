
import React from 'react';
import { render } from 'react-dom';
import './global.scss';
import './pre';
import { Root } from './Root';
// audioContext.audioWorklet.addModule(new URL(fnMeterUrl));

// const div = document.body.appendChild(document.createElement('app'));

render(<Root />, document.getElementById('app'));

// await setImmediateAsync();
// render(
//     <Root />
//     , div
// );
