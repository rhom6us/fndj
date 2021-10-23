import { Singleton } from '@rhombus/singleton';

window.AudioContext = Singleton(window.AudioContext);
