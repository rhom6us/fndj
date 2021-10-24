
import { ThemeProvider } from '@fndj/browser-ui';
import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Layout } from './Layout';

const queryClient = new QueryClient();


export const Root: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider >
        <Layout />
      </ThemeProvider>
      {/* <ReactQueryDevtools initialIsOpen={true} position="bottom-left" /> */}
      {/* <DevTools store={store as any} /> */}
    </QueryClientProvider>
  );
};;

// export default hot(module)(Root);
