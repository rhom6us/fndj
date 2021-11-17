import { R128 } from '@fndj/core';
import { audioContext as context } from '@rhombus/audioContext';
import { logger } from '@rhombus/logger';
import { CheapRingBuffer } from '@rhombus/type-helpers';
import * as ASSESS from './assess';
import { $, maxAbs, roundTo1Decimal, using } from './helpers';
import impulseResponseUrl from './impulse-responses_3sec-1-mono_44100.wav';



const audio_source_element = $("#audio_source") as HTMLMediaElement;
const source = context.createMediaElementSource(audio_source_element);


const analyserNode = context.createAnalyser();

const canvas_waveform = $<HTMLCanvasElement>("#canvas_waveform");
const canvas_loudness = $<'canvas'>(`#canvas_loudness`);
const rms_display = $<'div'>("#rms_display")!;
const psr_display = $<'div'>("#psr_display")!;
const short_term_loudness_display = $<'div'>("#short_term_loudness_display");


const peakHistory = CheapRingBuffer.from(Array.from(Array(canvas_waveform.width).keys()).map(p => 0));
const rmsHistory_L = CheapRingBuffer.from(peakHistory.slice());
const rmsHistory_R = CheapRingBuffer.from(peakHistory.slice());
const psrHistory = CheapRingBuffer.from(peakHistory.slice());
const impulseResponseBuffer = await (async function () {
    const response = await fetch(impulseResponseUrl);
    const arrayBuffer = await response.arrayBuffer();
    return context.decodeAudioData(arrayBuffer);
}());
const r128 = new R128(context, impulseResponseBuffer);

source.connect(r128);
source.connect(analyserNode);
source.connect(context.destination);

const dataArrayPeak = new Float32Array(analyserNode.frequencyBinCount);


(function draw() {
    analyserNode.getFloatTimeDomainData(dataArrayPeak);

    short_term_loudness_display!.innerHTML = `${roundTo1Decimal(r128.getShortTermLoudness())} LUFS`;

    //PEAK Calculation
    peakHistory.push(maxAbs(dataArrayPeak));

    const rms = r128.getRMS();
    rmsHistory_L.push(rms[0]);
    rmsHistory_R.push(rms[1]);
    rms_display.innerHTML = `L ${roundTo1Decimal(rms[0])} dbFS<br>R ${roundTo1Decimal(rms[1])} dbFS`;

    //Compute Peak to short-term loudness ratio PSR
    const psr_lu = r128.getPSR();

    if (!isNaN(psr_lu)) {
        psr_display.innerHTML = roundTo1Decimal(psr_lu) + " LU";
    }
    else {
        psr_display.innerHTML = "No signal";
    }

    // emoji_display.innerHTML = ASSESS.getPSREmoji(psr_lu);

    psrHistory.push(psr_lu);
    using(canvas_waveform, '2d', ctx => {
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(0, 0, canvas_waveform.width, canvas_waveform.height);
        ctx.lineWidth = 1;

        //PEAK
        ctx.strokeStyle = 'rgb(0, 0, 255)';
        ctx.beginPath();

        peakHistory.forEach((value, x) => {
            const height = canvas_waveform.height / 2;
            const diff = value * canvas_waveform.height;

            ctx.moveTo(x, height - diff);
            ctx.lineTo(x, height + diff);
        });


        ctx.stroke();

        //RMS
        ctx.strokeStyle = 'rgb(255, 0, 0)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, canvas_waveform.height);
        rmsHistory_L.map((l, i) => (l + rmsHistory_R[i]) / 2).forEach((value, x) => {
            const y = canvas_waveform.height - (value * 1.7 * canvas_waveform.height);
            ctx.lineTo(x, y);
        });
        ctx.stroke();
    });

    //PSR

    using(canvas_loudness, '2d', ctx => {
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(0, 0, canvas_waveform.width, canvas_waveform.height);
        ctx.lineWidth = 1;
        psrHistory.forEach((psr_value, x) => {
            ctx.beginPath();
            ctx.strokeStyle = ASSESS.getPSRColor(psr_value);
            const y = canvas_waveform.height - ((psr_value / 17) * canvas_waveform.height);
            //console.log(lineHeight);
            ctx.moveTo(x, canvas_waveform.height);
            ctx.lineTo(x, y);
            ctx.stroke();
        });

    });
    requestAnimationFrame(draw);
})();



$<'input'>("#file_input").addEventListener("change", <any>((e: { target: $<'input'>; }) => {
    context.resume();

    const file = e.target.files?.[0];
    if (file) {
        audio_source_element.src = URL.createObjectURL(file);
    }
}));

$<'button'>("#button_live_input")!.addEventListener("click", async () => {
    context.resume();

    if (!navigator.mediaDevices) {
        logger.warn('getUserMedia not supported on your browser!');
    }
    logger.log('getUserMedia supported.');
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        context.createMediaStreamSource(stream)
            .connect(analyserNode)
            .connect(r128);
    } catch (err) {
        logger.error('The following gUM error occured: ' + err);
    }


});
