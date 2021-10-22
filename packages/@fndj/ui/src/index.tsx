import { setImmediateAsync } from '@rhombus/async-timers';
import React from 'react';
import { render } from 'react-dom';
// import configureStore from './store';
import { Root } from './Root';

// //const store = configureStore();
const div = document.body.appendChild(document.createElement('div'));
await setImmediateAsync();
// render(
//   <AppContainer>
//     <Root /*store={store}*//>
//   </AppContainer>,
//   div//document.getElementById('root')
// );
// const renderRoot =( Component:any) => {
  render(

    <Root />
    , div
  );
// }

// renderRoot(Root);
// if (module.hot) {
//   module.hot.accept('./Root', () => { renderRoot(Root) });
// }
// if (module.hot) {
//   module.hot.accept('./Root', () => {
//     // eslint-disable-next-line @typescript-eslint/no-var-requires
//     const RootContainer = require('./Root').default;
//     render(
//       <AppContainer>
//         <RootContainer /*store={store}*/ />
//       </AppContainer>,
//       document.querySelector('react-dom')
//     );
//   });
// }


// const r = (Component: any) => {
//   render(<Component />, document.querySelector('react-dom'));
// };
// await setImmediateAsync();//(() => {
// //   document.body.appendChild(document.createElement('react-dom'));
// // r(Root);


// render(<Root />, document.body.appendChild(document.createElement('react-dom')));
// //});


declare global {
  export interface NodeModule {
    hot: {
      accept(module: string, callback: () => void): void;
    };
  }
}
