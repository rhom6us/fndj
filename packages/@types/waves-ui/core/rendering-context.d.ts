export default interface RenderingContext {
    timeToPixel: (time: number) => number;// = this.timeContext.timeToPixel;
    valueToPixel: (value: number) => number;// = this._valueToPixel;

    height: number;// = this.params.height;
    width: number;//  = this.timeContext.timeToPixel(this.timeContext.duration);
    // for foreign object issue in chrome
    offsetX: number;// = this.timeContext.timeToPixel(this.timeContext.offset);
    startX: number;// = this.timeContext.parent.timeToPixel(this.timeContext.start);

    // @todo replace with `minX` and `maxX` representing the visible pixels in which
    // the shapes should be rendered, could allow to not update the DOM of shapes
    // who are not in this area.
    trackOffsetX: number;// = this.timeContext.parent.timeToPixel(this.timeContext.parent.offset);
    visibleWidth: number;// = this.timeContext.parent.visibleWidth;
}
