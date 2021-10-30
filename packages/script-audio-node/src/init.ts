import { ScriptAudioNodeConstructor, _ScriptAudioNode } from './ScriptAudioNode';
import url from './ScriptAudioNode.worklet.ts';
import './worklet';

const registrations = new WeakSet<BaseAudioContext>();

export async function init(context: BaseAudioContext): Promise<ScriptAudioNodeConstructor> {
  if (!registrations.has(context)) {
    await context.audioWorklet.addModule(url);
    registrations.add(context);
  }
  return _ScriptAudioNode;
}
