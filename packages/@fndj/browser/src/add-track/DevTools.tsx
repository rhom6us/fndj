import { createDevTools } from '@fndj/browser-ui';
import { flattenMap } from '@rhombus/type-helpers';
import { events } from './reducers';
export const DevTools = createDevTools(flattenMap(events));
