import { parseReducers } from '@rhombus/redux-command-pattern';
import * as reducers from './reducers';
const [aaa, bbb] = parseReducers({hi: reducers});
