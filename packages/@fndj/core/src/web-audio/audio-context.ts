import { Lazy } from '@fndj/util';

export const audioContext = new Lazy(() => new AudioContext());
