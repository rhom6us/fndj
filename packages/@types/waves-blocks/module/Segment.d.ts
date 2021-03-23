export default Segment;
/**
 * Module that adds segment functionnality to the block.
 */
declare class Segment extends AbstractAnnotation {
    constructor(options: any);
    createNewAnnotationDatum(time: any): {
        time: any;
        label: string;
        duration: number;
    };
}
import AbstractAnnotation from "../../src/module/AbstractAnnotation";
//# sourceMappingURL=Segment.d.ts.map
