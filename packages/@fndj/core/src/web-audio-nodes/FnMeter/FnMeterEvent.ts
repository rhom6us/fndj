type Levels = { peak: number; rms: number; };
export class FnMeterEvent extends Event {
  /** Returns the data of the message. */
  readonly peak: number;
  readonly rms: number;
  constructor([{ peak: LP, rms: Lrms }, { peak: RP, rms: Rrms }]: [Levels, Levels]) {
    super('meter');
    this.peak = Math.max(LP, RP);
    this.rms = (Lrms + Rrms) / 2;
  }
}
