import React, { CSSProperties } from 'react';
import ReactDom from 'react-dom';
import wavesUI from 'waves-ui';

/**
 * A shape to display a marker.
 *
 * [example usage](./examples/layer-marker.html)
 */

export class Marker extends wavesUI.shapes.BaseShape {
  x!: (data: any) => number;
  color!: (data: any) => string;
  $handler?: SVGElement;
  $line?: SVGElement;
  constructor(options?: any) {
    super(options);
  }
  /*override*/ getClassName() { return 'marker'; }

  _getAccessorList() {
    return { x: 0, color: '#ff0000' };
  }

  _getDefaults() {
    return {
      handlerWidth: 15,
      handlerHeight: 15,
      displayHandlers: true,
      opacity: 1,
      color: 'red',
    };
  }
  /**
   * <g opacity={this.params.opacity} transform={`translate(${x}, 0)`} style={{stroke: color}}>
   *   <line x={0} y1={0} y2={height} shape-rendering="cripsEdges" />
   *   {this.params.displayHandlers && <rect style={{fill: color}} x={-((this.params.handlerWidth) / 2 )} y1={renderingContext.height - this.params.handlerHeight} width={this.params.handlerWidth} y2={this.params.handlerHeight }  shape-rendering="cripsEdges"  />}
   * </g>
   */
  // render2(renderingContext: LayerTimeContext, datum?: any) {
  //   const height = renderingContext.height;
  //   const x = renderingContext.timeToPixel(this.x(datum)) - 0.5;
  //   const color = this.color(datum);
  //   const gColor: CSSProperties = datum?.color ? { stroke: color } : {};
  //   const rectColor: CSSProperties = datum?.color ? { fill: color } : {};
  //   const jsxResult = (<g opacity={this.params.opacity} transform={`translate(${x}, 0)`} style={gColor}>
  //     <line x={0} y1={0} y2={height} shapeRendering="crispEdges" />
  //     {this.params.displayHandlers && <rect style={rectColor} x={-((this.params.handlerWidth) / 2)} y1={renderingContext.height - this.params.handlerHeight} width={this.params.handlerWidth} y2={this.params.handlerHeight} shapeRendering="crispEdges" />}
  //   </g>);
  //   return jsxResult;
  // }
  render(renderingContext: wavesUI.core.LayerTimeContext) {
    if (this.$el) { return this.$el; }
    // this.$el = document.createDocumentFragment() as any;
    // const jsxResult = this.render2(renderingContext);
    // ReactDom.render(jsxResult, this.$el);
    // return this.$el;
    const height = renderingContext.height;

    this.$el = document.createElementNS(this.ns, 'g') as any;
    this.$line = document.createElementNS(this.ns, 'line') as any as SVGElement;

    // draw line
    this.$line.setAttributeNS(null, 'x', 0);
    this.$line.setAttributeNS(null, 'y1', 0);
    this.$line.setAttributeNS(null, 'y2', height);
    this.$line.setAttributeNS(null, 'shape-rendering', 'crispEdges');

    this.$el.appendChild(this.$line);

    if (this.params.displayHandlers) {
      this.$handler = document.createElementNS(this.ns, 'rect') as any as SVGElement;

      this.$handler.setAttributeNS(null, 'x', -((this.params.handlerWidth) / 2));
      this.$handler.setAttributeNS(null, 'y', renderingContext.height - this.params.handlerHeight);
      this.$handler.setAttributeNS(null, 'width', this.params.handlerWidth);
      this.$handler.setAttributeNS(null, 'height', this.params.handlerHeight);
      this.$handler.setAttributeNS(null, 'shape-rendering', 'crispEdges');

      this.$el.appendChild(this.$handler);
    }

    this.$el.style.opacity = this.params.opacity;

    return this.$el;
  }

  update(renderingContext: wavesUI.core.LayerTimeContext, datum?: any) {
    // const jsxResult = this.render2(renderingContext, datum);
    // ReactDom.render(jsxResult, this.$el);


    const x = renderingContext.timeToPixel(this.x(datum)) - 0.5;
    const color = this.color(datum);

    this.$el.setAttributeNS(null, 'transform', `translate(${x}, 0)`);
    this.$line!.style.stroke = color;

    if (this.params.displayHandlers) {
      this.$handler!.style.fill = color;
    }
  }

  inArea(renderingContext: wavesUI.core.LayerTimeContext, datum: any, x1: number, y1: number, x2: number, y2: number) {
    // handlers only are selectable
    const x = renderingContext.timeToPixel(this.x(datum));
    const shapeX1 = x - (this.params.handlerWidth - 1) / 2;
    const shapeX2 = shapeX1 + this.params.handlerWidth;
    const shapeY1 = renderingContext.height - this.params.handlerHeight;
    const shapeY2 = renderingContext.height;

    const xOverlap = Math.max(0, Math.min(x2, shapeX2) - Math.max(x1, shapeX1));
    const yOverlap = Math.max(0, Math.min(y2, shapeY2) - Math.max(y1, shapeY1));
    const area = xOverlap * yOverlap;

    return area > 0;
  }
}
