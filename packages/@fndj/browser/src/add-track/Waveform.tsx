 import React, { memo } from "react";
// import { useCanvas } from '../hooks';
export interface WaveformProps {
    data: Uint8ClampedArray;
    width: number;
}


export const Waveform = memo<WaveformProps>(({ data, width }) => {
    return <section><h4>hiiii</h4></section>
})
// type CanvasProps = Omit<React.CanvasHTMLAttributes<HTMLCanvasElement>, keyof WaveformProps>;
// export const Waveform: React.FC<WaveformProps & CanvasProps> = ({ data, width, ...canvasProps }) => {
//     const ref = useCanvas();

//     // useEffect(() => {
//     //     const canvas = ref.current!;
//     //     const { width: cssWidth, height: cssHeight } = canvas.getBoundingClientRect();
//     //     const { devicePixelRatio:ratio=1 } = window
//     //     canvas.width = cssWidth * devicePixelRatio;
//     //     canvas.height = cssHeight * devicePixelRatio;

//     // },[])

//     useEffect(() => {
//         const imagedata = new ImageData(data, width);
//         const canvas = ref.current!;
//         canvas.width = width;
//         canvas.height = new Int32Array(data.buffer).length / width;
//         const { devicePixelRatio: ratio = 1 } = window;
//         canvas.style.width = CSS.px(canvas.width / ratio).toString();
//         canvas.style.height = CSS.px(canvas.height / ratio).toString();
//         canvas.getContext('2d')!.putImageData(imagedata, 0, 0);
//     }, [data]);

//     return (
//         <canvas ref={ref} {...canvasProps} width={width} ></canvas>
//     );
// };
