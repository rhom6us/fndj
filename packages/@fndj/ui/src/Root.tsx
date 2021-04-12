
// import { hot } from 'react-hot-loader';
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

export const Root = () => {
    return (
      // <Provider store={store}>

          <PreProcess />


      // </Provider>
    );
}

// export default hot(module)(Root);
