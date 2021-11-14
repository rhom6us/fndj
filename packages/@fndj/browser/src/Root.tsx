
import { ThemeProvider } from '@fndj/browser-ui';
import React, { FC } from 'react';
import { QueryClient } from 'react-query';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddTrack } from './add-track';

const queryClient = new QueryClient();


export const Root: FC = () => {
  return (
    // <QueryClientProvider client={queryClient}>
    <ThemeProvider >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddTrack />} >
            {/* <Route path="add-track" element={<AddTrack />} />
            <Route path="tracks/:id" element={<ConfigureTrack />} /> */}
          </Route>
          {/* <Route path="*" element={<div>hi there</div>} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    // {/* <ReactQueryDevtools initialIsOpen={true} position="bottom-left" /> */}
    // {/* <DevTools store={store as any} /> */}
    // </QueryClientProvider>
  );
};;

// export default hot(module)(Root);
