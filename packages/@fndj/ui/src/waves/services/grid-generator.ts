import TimelineTimeContext from 'waves-ui/core/timeline-time-context';

export type Signature<top extends number = number, bottom extends number = number> = `${top}/${bottom}`;


export function gridAxisGenerator(bpm: number, signature: Signature<number, number>, start: number, offset: number) {
  const _bps = bpm / 60; // sec
  const [_nbrUnitsPerMesure, _unit] = signature.split('/').map(p => parseInt(p, 10));
  return (timeContext: TimelineTimeContext) => Array.from(result(timeContext));
  function* result(timeContext: TimelineTimeContext) {
    const duration = timeContext.visibleDuration;
    const off = timeContext.offset + offset;

    // const min = Math.min(-off, 0);
    const skip = - off;
    // remove the timeline's off to keep the layer centered
    const max = duration - off;

    // define pixels for 1 second
    const pixelsPerSecond = timeContext.computedPixelsPerSecond;
    // time for one _unit
    const period = 1 / _bps;
    // define the first tick > min
    // skip:2, period:.5

    // |***********skip**********|  27
    // |*period*||*period*||*period*||*period*| 10*4
    //                     |*mod*| 7
    //                     |firstTickTime
    const modulo = skip % period;
    const mult = (skip - modulo) / period; // how many whole periods were skipped
    // track which position of current beat in the mesure
    let positionInMesure = 1;//mult % _nbrUnitsPerMesure;

    // remove not focused beats, if zoomed out
    const pixelsPerTick = pixelsPerSecond / _bps;
    const minStep = 1;
    let first = true;
    // time should be
    for (let time = start - period * 3; time < max; time += period) {
      // find first beat
      const focused = (positionInMesure++ % _nbrUnitsPerMesure === 0);
      // ignore if pixels per ticks is too small
      if ((pixelsPerTick <= minStep) && !focused) { continue; }
      yield { time, focused };

    }

  };
}
