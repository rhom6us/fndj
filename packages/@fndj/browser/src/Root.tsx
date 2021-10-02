
// import { hot } from 'react-hot-loader';
import React, { FC } from 'react';
import { Provider } from 'react-redux';

import { CommandBarBasicExample, Layout, ThemeProvider } from '@fndj/browser-ui';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

export const Root: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider >
        <Layout />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={true} position="bottom-left" />
    </QueryClientProvider>
  );
};;

// export default hot(module)(Root);
