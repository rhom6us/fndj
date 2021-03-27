
import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import type { Store } from 'redux';
import {PreProcess} from './preprocess';
// import DevTools from './DevTools';
// import { CounterState } from '../reducers';
// import { CounterAction } from '../actions/CounterActions';

interface Props {
  //store: Store<CounterState, CounterAction>;
}

const Root = () => {
    return (
      // <Provider store={store}>
        <div>4543
          <PreProcess />
          {/* <DevTools /> */}
        </div>
      // </Provider>
    );
}

export default hot(module)(Root);
