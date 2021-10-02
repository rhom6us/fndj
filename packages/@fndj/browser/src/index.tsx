import React from 'react';
import { render } from 'react-dom';
import { Root } from './Root';
import { setImmediateAsync } from '@fndj/util';
import './global.scss';

const div = document.body.appendChild(document.createElement('app'));
await setImmediateAsync();
render(
    <Root />
    , div
);
