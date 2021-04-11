// declare module 'waves-ui' {

export namespace core {
    export { LayerTimeContext };
    export { Layer, LayerOptions, Domain, Datum, DataType, Accessor };
    export { namespace };
    export { TimelineTimeContext };
    export { Timeline };
    export { TrackCollection };
    export { Track };
}
export namespace shapes {
    export { AnnotatedMarker };
    export { AnnotatedSegment };
    export { BaseShape };
    export { Cursor };
    export { Dot };
    export { Line };
    export { Marker };
    export { Segment };
    export { Ticks };
    export { TracePath };
    export { TraceDots };
    export { Waveform };
}
export namespace behaviors {
    export { BaseBehavior };
    export { BreakpointBehavior };
    export { MarkerBehavior };
    export { SegmentBehavior };
    export { TimeContextBehavior };
    export { TraceBehavior };
}
export namespace interactions {
    export { EventSource };
    export { Keyboard };
    export { Surface };
    export { WaveEvent };
}
export namespace states {
    export { BaseState };
    export { BreakpointState };
    export { BrushZoomState };
    export { CenteredZoomState };
    export { ContextEditionState };
    export { EditionState };
    export { SelectionState };
    export { SimpleEditionState };
}
export namespace helpers {
    export { AnnotatedMarkerLayer };
    export { AnnotatedSegmentLayer };
    export { BreakpointLayer };
    export { CursorLayer };
    export { GridAxisLayer };
    export { MarkerLayer };
    export { SegmentLayer };
    export { TickLayer };
    export { TimeAxisLayer };
    export { TraceLayer };
    export { WaveformLayer };
}
export namespace axis {
    export { AxisLayer };
    export { timeAxisGenerator };
    export { gridAxisGenerator };
}
export namespace utils {
    export { format };
    export { OrthogonalData };
    export { scales, Scale };
}
// }

import LayerTimeContext from "./core/layer-time-context";
// import Layer from "./core/layer";
import { default as Layer, LayerOptions, Domain, Datum, DataType, Accessor } from './core/layer';
import namespace from "./core/namespace";
import TimelineTimeContext from "./core/timeline-time-context";
import Timeline from "./core/timeline";
import TrackCollection from "./core/track-collection";
import Track from "./core/track";
import AnnotatedMarker from "./shapes/annotated-marker";
import AnnotatedSegment from "./shapes/annotated-segment";
import BaseShape from "./shapes/base-shape";
import Cursor from "./shapes/cursor";
import Dot from "./shapes/dot";
import Line from "./shapes/line";
import Marker from "./shapes/marker";
import Segment from "./shapes/segment";
import Ticks from "./shapes/ticks";
import TracePath from "./shapes/trace-path";
import TraceDots from "./shapes/trace-dots";
import Waveform from "./shapes/waveform";
import BaseBehavior from "./behaviors/base-behavior";
import BreakpointBehavior from "./behaviors/breakpoint-behavior";
import MarkerBehavior from "./behaviors/marker-behavior";
import SegmentBehavior from "./behaviors/segment-behavior";
import TimeContextBehavior from "./behaviors/time-context-behavior";
import TraceBehavior from "./behaviors/trace-behavior";
import EventSource from "./interactions/event-source";
import Keyboard from "./interactions/keyboard";
import Surface from "./interactions/surface";
import WaveEvent from "./interactions/wave-event";
import BaseState from "./states/base-state";
import BreakpointState from "./states/breakpoint-state";
import BrushZoomState from "./states/brush-zoom-state";
import CenteredZoomState from "./states/centered-zoom-state";
import ContextEditionState from "./states/context-edition-state";
import EditionState from "./states/edition-state";
import SelectionState from "./states/selection-state";
import SimpleEditionState from "./states/simple-edition-state";
import AnnotatedMarkerLayer from "./helpers/annotated-marker-layer";
import AnnotatedSegmentLayer from "./helpers/annotated-segment-layer";
import BreakpointLayer from "./helpers/breakpoint-layer";
import CursorLayer from "./helpers/cursor-layer";
import GridAxisLayer from "./helpers/grid-axis-layer";
import MarkerLayer from "./helpers/marker-layer";
import SegmentLayer from "./helpers/segment-layer";
import TickLayer from "./helpers/tick-layer";
import TimeAxisLayer from "./helpers/time-axis-layer";
import TraceLayer from "./helpers/trace-layer";
import WaveformLayer from "./helpers/waveform-layer";
import AxisLayer from "./axis/axis-layer";
import timeAxisGenerator from "./axis/time-axis-generator";
import gridAxisGenerator from "./axis/grid-axis-generator";
import format from "./utils/format";
import OrthogonalData from "./utils/orthogonal-data";
import { default as scales, Scale } from "./utils/scales";
//# sourceMappingURL=waves-ui.d.ts.map
