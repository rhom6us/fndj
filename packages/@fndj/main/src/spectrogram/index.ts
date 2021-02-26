// export function createSpectrogram(buffer: AudioBuffer, canvas: HTMLCanvasElement) {
//     const context = new OfflineAudioContext(2, buffer.length, buffer.sampleRate);
//     const sourceNode = context.createBufferSource();
//     const analyzerNode = context.createAnalyser();
//     const scriptNode = context.createScriptProcessor();

//     sourceNode.buffer = buffer;

//     // when the javascript node is called
//     // we use information from the analyzer node
//     // to draw the volume
//     scriptNode.onaudioprocess = function () {

//         // get the average for the first channel
//         const array = new Uint8Array(analyzerNode.frequencyBinCount);
//         analyzerNode.getByteFrequencyData(array);

//         // draw the spectrogram
//         // if (sourceNode.playbackState == sourceNode.PLAYING_STATE) {
//         drawSpectrogram(array);
//         // }
//     };

//     sourceNode.connect(analyzerNode).connect(scriptNode).connect(context.destination);



// }
// function drawSpectrogram(array: Uint8Array, canvas: HTMLCanvasElement) {

//     const ctx = canvas.getContext('2d')!;
//     // create a temp canvas we use for copying and scrolling
//     const tempCanvas = document.createElement("canvas");
//     const tempCtx = tempCanvas.getContext("2d")!;
//     tempCanvas.width = 800;
//     tempCanvas.height = 512;

//     // used for color distribution
//     const hot = new chroma.ColorScale({
//         colors: ['#000000', '#ff0000', '#ffff00', '#ffffff'],
//         positions: [0, .25, .75, 1],
//         mode: 'rgb',
//         limits: [0, 300]
//     });

//     tempCtx.drawImage(canvas, 0, 0, 800, 512);

//     // iterate over the elements from the array
//     for (let i = 0; i < array.length; i++) {
//         // draw each pixel with the specific color
//         const value = array[i];
//         ctx.fillStyle = hot.getColor(value).hex();

//         // draw the line at the right side of the canvas
//         ctx.fillRect(800 - 1, 512 - i, 1, 1);
//     }

//     // set translate on the canvas
//     ctx.translate(-1, 0);
//     // draw the copied image
//     ctx.drawImage(tempCanvas, 0, 0, 800, 512, 0, 0, 800, 512);

//     // reset the transformation matrix
//     ctx.setTransform(1, 0, 0, 1, 0, 0);
// }
