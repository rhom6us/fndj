
export function forEachOutput<TChain extends AudioNode>(start: AudioNode, builder: (start: AudioNode, output: number) => TChain): TChain[];
export function forEachOutput<TDest extends AudioNode>(start: AudioNode, builder: (start: AudioNode, output: number) => AudioNode, destinationNode: TDest): TDest;
export function forEachOutput<TChain extends AudioNode, TDest extends AudioNode>(start: AudioNode, builder: (start: AudioNode, output: number) => TChain, destinationNode?: TDest): TDest | TChain[] {
    const chainResults = Array.from(Array(start.numberOfOutputs).keys()).map(o => builder(start, o));
    if (!destinationNode) {
        return chainResults;
    }
    chainResults.forEach(p => p.connect(destinationNode));
    return destinationNode;
}
