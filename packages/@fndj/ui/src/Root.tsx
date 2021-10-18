
// import { hot } from 'react-hot-loader';
import { obj } from '@rhombus/type-helpers';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { PreProcess } from './preprocess';
// import DevTools from './DevTools';
// import { CounterState } from '../reducers';
// import { CounterAction } from '../actions/CounterActions';



const queryClient = new QueryClient();

const devToolOptions = {

  /** Set this true if you want the dev tools to default to being open */
  initialIsOpen: true,

/** Use this to add props to the toggle button, close button, or panel. For example, you can add className, style (merge and override default style), onClick (extend default handler), etc. */
  // panelProps: { style: {}, className: ''},
  // closeButtonProps: { style: {}, className: ''},
  // toggleButtonProps: { style: {}, className: ''},

  /** "top-left" | "top-right" | "bottom-left" | "bottom-right" */
  position: 'bottom-left'
} as const;
obj.entries(devToolOptions).filter(([, p]) => p === undefined).forEach(([k]) => delete devToolOptions[k]);
export const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PreProcess />
      <ReactQueryDevtools {...devToolOptions} />
    </QueryClientProvider>
    // <Provider store={store}>



    // </Provider>
  );
};;

// export default hot(module)(Root);
