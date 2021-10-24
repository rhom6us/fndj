
import { createDevTools as _createDevTools, persistState } from '@redux-devtools/core';
import DockMonitor from '@redux-devtools/dock-monitor';
import LogMonitor from '@redux-devtools/log-monitor';
import React from 'react';
import { DispatcherProps } from 'redux-devtools-dispatch';


// createDevTools takes a monitor and produces a DevTools component
export function createDevTools(actionCreators: DispatcherProps['actionCreators']) {
  return _createDevTools(
    // Monitors are individually adjustable with props.
    // Consult their repositories to learn about those props.
    // Here, we put LogMonitor inside a DockMonitor.
    // Note: DockMonitor is visible by default.pnpm
    <DockMonitor
      toggleVisibilityKey="ctrl-h"
      changePositionKey="ctrl-q"
      defaultIsVisible={true}
      defaultPosition={'right'}
    >
      {/* <MultipleMonitors> */}
        <LogMonitor theme="tomorrow"  />
        {/* <InspectorMonitor tabs={(defaultTabs:any) => [...defaultTabs, { name: 'Trace', component: TraceTab }]}   /> */}
        {/* <Dispatcher actionCreators={actionCreators}  /> */}
        {/* <SliderMonitor keyboardEnabled /> */}
      {/* </MultipleMonitors> */}
    </DockMonitor>
  );
}


export function getDevToolEnhancers(devTool: ReturnType<typeof createDevTools>) {
  return [
    devTool.instrument({
      trace: true,

    }),
    // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
    persistState((function getDebugSessionKey() {
      /**
       * "persistState" lets you serialize whole sessions (including all dispatched actions and the state of the
       * monitors) by a URL key. So if you visit http://localhost:3000/?debug_session=reproducing_weird_bug, do
       * something in the app, then open http://localhost:3000/?debug_session=some_other_feature, and then go back
       * to http://localhost:3000/?debug_session=reproducing_weird_bug, the state will be restored.
       */
      const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
      return matches && matches.length > 0 ? matches[1] : null;
    }()))
  ];
};
