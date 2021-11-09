import { CompositeAudioNode } from "./CompositeAudioNode";
import './util';
import { AudioNodeLike, AudioNodeList } from "./util";

function flipRightChannel(context: BaseAudioContext) {
    return function flipRightChannel(item: AudioNodeLike, index: number) {
        if (index === 0) {
            return item;
        }
        return item.connect(new GainNode(context, {gain:-1}));
    }
}

export class MidSideNode extends CompositeAudioNode {
    protected buildGraph(sourceNode: AudioNode, destinationNode: AudioNode): void {
        const leftRight = sourceNode.splitChannels(2);
        const mergeChannel = this.context.createChannelMerger(2);

        leftRight
            .connect(mergeChannel, 0); //mid
        (leftRight
            .map(flipRightChannel(this.context)) as AudioNodeList)
            .connect(mergeChannel, 1); //sides
        
        mergeChannel
            .connect(new GainNode(this.context, { gain: 2 ** -.5 })) // -3db
            .connect(destinationNode);

    }
}
