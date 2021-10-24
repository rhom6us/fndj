import { createDevTools } from '@redux-devtools/core';
import { EnhancedStore } from '@redux-devtools/instrument';
import LogMonitor from '@redux-devtools/log-monitor';
import { listenEventAsync } from '@rhombus/async-timers';
import React from 'react';
import { render } from 'react-dom';
import { Action } from 'redux';


// export const DevTools = createDevTools()
//     // Monitors are individually adjustable with props.
//     // Consult their repositories to learn about those props.
//     // Here, we put LogMonitor inside a DockMonitor.
//     // Note: DockMonitor is visible by default.
//     <DockMonitor
//       toggleVisibilityKey="ctrl-h"
//       changePositionKey="ctrl-q"
//       defaultIsVisible={true}
//     >
//       <LogMonitor theme="tomorrow" store={undefined} />
//     </DockMonitor>
//   );
const DevTools = createDevTools(<LogMonitor theme="tomorrow" />);
export async function showDevToolsPopup(store: EnhancedStore<any, Action<any>, any | undefined>) {

    const popup = window.open(undefined,
        'Redux DevTools',
        'menubar=no,location=no,resizable=yes,scrollbars=no,status=no'
    )!;
    // Reload in case it already exists
    popup.location.reload();
    // await setImmediateAsync();
    // await setTimeoutAsync(10);
    await listenEventAsync(popup, 'load');
    const div = popup.document.createElement('div');
    popup.document.appendChild(div);
    await listenEventAsync(div, 'load');
    render(<DevTools store={store} />, div);
    // popup.addEventListener('load', () => {
    //     const div = popup.document.createElement('div');
    //     popup.document.appendChild(div);
    //     div.addEventListener('load', () => {

    //     }, { once: true, capture: false, passive: true });
    // }, { once: true, capture: false, passive: true });
}
