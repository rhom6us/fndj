export default DataPlayer;
declare class DataPlayer extends AbstractPlayer {
    _running: boolean;
    _listeners: Set<any>;
    _emit(data: any): void;
    _ended(): void;
    dataReader: any;
    bridge: any;
    setTrack(trackConfig: any): void;
    addListener(listener: any): void;
    removeListener(listener: any): void;
}
import AbstractPlayer from "../core/AbstractPlayer";
//# sourceMappingURL=DataPlayer.d.ts.map