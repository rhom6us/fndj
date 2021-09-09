/* eslint-disable no-console */
import * as dom from './dom';
import { g, getMinOfArray } from './helpers';

let wavesurfer: WaveSurfer;
// let combined;
let loudness_canvas: HTMLCanvasElement;//{ style: { width: string; height: string; }; getBoundingClientRect: () => { (): any; new(): any; width: number; height: number; }; setAttribute: (arg0: string, arg1: number) => void; getContext: (arg0: string) => any; } | null = null;
let psr_canvas;
let loudness: number[];
let psr: number[];
let true_peak: number[];
let integratedLoudness: number;// | null = null;
let loudness_display: HTMLElement;// { innerHTML: string; } | null = null;
let psr_display: HTMLElement;//{ innerHTML: string; } | null = null;
let dbtp_display: HTMLElement;//{ style: { color: string; }; innerHTML: string; } | null = null;
const channel_count = 2;// = null;
let impulseResponseBuffer: AudioBuffer;// | null = null;
let max_true_peak: number;// | null = null;
let worker1_progress = 0;
let worker2_progress = 0;


function startComputations(wavesurfer: WaveSurfer) {

	loudness_canvas = dom.make("canvas", "loudness_canvas", "", document.querySelector('#loudness_div')!);
	loudness_canvas.style.width = "100%";
	loudness_canvas.style.height = "150px";

	psr_canvas = dom.make("canvas", "psr_canvas", "", g("psr_div")!);
	psr_canvas.style.width = "100%";
	psr_canvas.style.height = "150px";

	const canvas_width = loudness_canvas.getBoundingClientRect().width * 2;
	const canvas_height = loudness_canvas.getBoundingClientRect().height * 2;

	// channel_count = (((wavesurfer.backend as any).analyser ?? (wavesurfer.backend as any).gainNode ?? (wavesurfer.backend as any).scriptNode) as AudioNode).channelCount;
	const aa = new AudioContext();
	aa.createAnalyser().channelCount;
	const untouched_buffers: any[] = [];

	// we will also need the untouched channels for PSR calculation
	const leftChannel_untouched = wavesurfer.backend.buffer.getChannelData(0);
	untouched_buffers.push(leftChannel_untouched);
	if (channel_count == 2) {
		const rightChannel_untouched = wavesurfer.backend.buffer.getChannelData(1);
		untouched_buffers.push(rightChannel_untouched);
	}
	if (channel_count > 2) {
		console.error("Cannot handle more than 2 channels.");
		return;
	}

	/* INTEGRATED LOUDNESS */
	(function () {
		//get an audioBuffer, in which EBU-S values are stored
		const lengthInSeconds = leftChannel_untouched.length / wavesurfer.backend.ac.sampleRate;
		//do not resample
		const targetSampleRate = wavesurfer.backend.ac.sampleRate;
		const OAC_IL = new OfflineAudioContext(channel_count, lengthInSeconds * targetSampleRate, targetSampleRate);
		const source = OAC_IL.createBufferSource();
		source.buffer = wavesurfer.backend.buffer;

		const splitter = OAC_IL.createChannelSplitter(2);
		const merger = OAC_IL.createChannelMerger(2);

		//first stage shelving filter
		const highshelf_filter = OAC_IL.createBiquadFilter();
		highshelf_filter.type = "highshelf";
		highshelf_filter.Q.value = 1;
		highshelf_filter.frequency.value = 1500;
		highshelf_filter.gain.value = 4;

		// second stage highpass filter
		const highpass_filter = OAC_IL.createBiquadFilter();
		highpass_filter.frequency.value = 76;
		highpass_filter.Q.value = 1;
		highpass_filter.type = "highpass";

		//SQUARING EVERY CHANNEL
		const square_gain = OAC_IL.createGain();
		square_gain.gain.value = 0;

		//CONNECTING EBU GRAPH
		source
			.connect(highshelf_filter)
			.connect(highpass_filter)
			.connect(square_gain);
		highpass_filter.connect(square_gain.gain);
		square_gain.connect(OAC_IL.destination);

		source.start();

		OAC_IL.startRendering().then(function (renderedBuffer) {
			console.log('Rendering completed successfully');
			const signal_filtered_squared = [
				renderedBuffer.getChannelData(0),
				renderedBuffer.getChannelData(1)
			];

			const il_worker = new Worker("js/workers/integrated-loudness-worker.js");
			//compute integrated loudness
			il_worker.postMessage({
				buffers: signal_filtered_squared,
				duration: wavesurfer.backend.buffer.duration
			});

			il_worker.onmessage = function (e) {
				const data = e.data;
				if (data.type == "finished") {
					console.log("ILW finished! Integrated loudness: " + data.integratedLoudness + " LUFS");
					integratedLoudness = data.integratedLoudness;
				}
			};
		});
	}());
	(function () {
		//get an audioBuffer, in which EBU-S values are stored
		const lengthInSeconds = leftChannel_untouched.length / wavesurfer.backend.ac.sampleRate;
		//do not resample
		const targetSampleRate = wavesurfer.backend.ac.sampleRate;
		const OAC = new OfflineAudioContext(channel_count, lengthInSeconds * targetSampleRate, targetSampleRate);
		const source = OAC.createBufferSource();
		source.buffer = wavesurfer.backend.buffer;

		const ebu_splitter = OAC.createChannelSplitter(2);

		//first stage shelving filter
		const highshelf_filter_L = OAC.createBiquadFilter();
		highshelf_filter_L.type = "highshelf";
		highshelf_filter_L.Q.value = 1;
		highshelf_filter_L.frequency.value = 1500;
		highshelf_filter_L.gain.value = 4;

		const highshelf_filter_R = OAC.createBiquadFilter();
		highshelf_filter_R.type = "highshelf";
		highshelf_filter_R.Q.value = 1;
		highshelf_filter_R.frequency.value = 1500;  //deduced with IIRFilter.getFrequencyResponse
		highshelf_filter_R.gain.value = 4;

		// second stage highpass filter
		const highpass_filter_L = OAC.createBiquadFilter();
		highpass_filter_L.frequency.value = 76;
		highpass_filter_L.Q.value = 1;
		highpass_filter_L.type = "highpass";

		const highpass_filter_R = OAC.createBiquadFilter();
		highpass_filter_R.frequency.value = 76;
		highpass_filter_R.Q.value = 1;
		highpass_filter_R.type = "highpass";

		//SQUARING EVERY CHANNEL
		const ebu_square_gain_L = OAC.createGain();
		ebu_square_gain_L.gain.value = 0;

		const ebu_square_gain_R = OAC.createGain();
		ebu_square_gain_R.gain.value = 0;

		const ebu_convolver_L = OAC.createConvolver();
		ebu_convolver_L.normalize = false;
		const ebu_convolver_R = OAC.createConvolver();
		ebu_convolver_R.normalize = false;

		ebu_convolver_L.buffer = impulseResponseBuffer;
		ebu_convolver_R.buffer = impulseResponseBuffer;

		const ebu_mean_gain_L = OAC.createGain();
		ebu_mean_gain_L.gain.value = 1 / (OAC.sampleRate * 3);
		const ebu_mean_gain_R = OAC.createGain();
		ebu_mean_gain_R.gain.value = 1 / (OAC.sampleRate * 3);

		const ebu_channel_summing_gain = OAC.createGain();

		const ebu_s_analyzer = OAC.createAnalyser();
		ebu_s_analyzer.fftSize = 2048;

		//CONNECTING EBU GRAPH
		source.connect(ebu_splitter);
		ebu_splitter.connect(highshelf_filter_L, 0, 0);
		ebu_splitter.connect(highshelf_filter_R, 1, 0);

		highshelf_filter_L.connect(highpass_filter_L);
		highshelf_filter_R.connect(highpass_filter_R);

		highpass_filter_L.connect(ebu_square_gain_L);
		highpass_filter_L.connect(ebu_square_gain_L.gain);

		highpass_filter_R.connect(ebu_square_gain_R);
		highpass_filter_R.connect(ebu_square_gain_R.gain);

		ebu_square_gain_L.connect(ebu_convolver_L).connect(ebu_mean_gain_L);
		ebu_square_gain_R.connect(ebu_convolver_R).connect(ebu_mean_gain_R);

		ebu_mean_gain_L.connect(ebu_channel_summing_gain);
		ebu_mean_gain_R.connect(ebu_channel_summing_gain);

		ebu_channel_summing_gain.connect(OAC.destination);

		source.start();

		OAC.startRendering().then(function (renderedBuffer) {
			console.log('Rendering completed successfully');
			const ebu_buffer = renderedBuffer.getChannelData(0);
			const worker = new Worker("js/workers/loudness-worker.js");
			worker.postMessage({
				ebu_buffer: ebu_buffer,
				untouched_buffers: untouched_buffers,
				width: canvas_width
			});
			console.log('Data to analyse posted to worker');

			worker.onmessage = function (e) {
				const data = e.data;
				if (data.type == "finished") {
					console.log('Message received from worker');
					console.log(data);
					g("conducting_loudness_analysis")!.style.display = "none";
					loudness = data.loudness;
					psr = data.psr;
					drawLoudnessDiagram(loudness);
					drawPSRDiagram(psr);
					drawConclusion(psr);
					g("meters_div")!.style.display = "block";
					wavesurfer.play();
				}
				if (data.type == "progress") {
					worker1_progress = (data.progress / 2) + 50;
					g("progress_value_disp")!.innerHTML = '' + Math.round(((worker1_progress / 100) + (worker2_progress / 100)) / 2 * 100);
				}
			};
		});
	}());
	//True-peak context
	(function () {
		//get an audioBuffer, in which EBU-S values are stored
		const lengthInSeconds = leftChannel_untouched.length / wavesurfer.backend.ac.sampleRate;
		//oversample to 192000 Hz
		const targetSampleRate = 192000;
		const OAC_TP = new OfflineAudioContext(channel_count, lengthInSeconds * targetSampleRate, targetSampleRate);
		const source = OAC_TP.createBufferSource();
		source.buffer = wavesurfer.backend.buffer;
		source.start();

		const gain = OAC_TP.createGain();
		gain.gain.value = 0.5;

		const lp_filter = OAC_TP.createBiquadFilter();
		lp_filter.type = "lowpass";
		lp_filter.frequency.value = 20000;

		source.connect(gain).connect(lp_filter).connect(OAC_TP.destination);

		OAC_TP.startRendering().then(function (renderedBuffer) {
			console.log('OAC_TP rendering completed successfully');
			const buffers = [renderedBuffer.getChannelData(0)];
			if (renderedBuffer.numberOfChannels > 1) {
				buffers.push(renderedBuffer.getChannelData(1));
			}
			const worker = new Worker("js/workers/true-peak-worker.js");
			worker.postMessage({
				buffers: buffers,
				width: canvas_width
			});
			console.log('True peak: Data to analyse posted to worker');

			worker.onmessage = function (e) {
				const data = e.data;
				if (data.type == "finished") {
					console.log('True peak: Worker has finished');
					console.log("Maximum detected value: " + data.max + " dBTP");
					max_true_peak = data.max;
					true_peak = data.true_peak;
				}
				if (data.type == "progress") {
					worker2_progress = data.progress;

					// g("progress_value_disp")!.innerHTML = Math.round(((worker1_progress / 100) + (worker2_progress / 100)) / 2 * 100);
					document.querySelector('#progress_value_disp')!.innerHTML = '' + Math.round(((worker1_progress / 100) + (worker2_progress / 100)) / 2 * 100);
				}
			};
		});
	}());

}


function drawLoudnessDiagram(loudness: number[]) {
	const canvas_width = loudness_canvas.getBoundingClientRect().width * 2;
	const canvas_height = loudness_canvas.getBoundingClientRect().height * 2;
	//set canvas height and width manually
	loudness_canvas.setAttribute("width", canvas_width.toString());
	loudness_canvas.setAttribute("height", canvas_height.toString());
	const ctx = loudness_canvas.getContext("2d")!;

	//calculate RMS for every pixel
	for (let i = 0; i < canvas_width; i++) {

		ctx.beginPath();
		ctx.lineWidth = 1;

		//typical crest factors are -20 to -3 dbFS
		const lineHeight = canvas_height * ((loudness[i] + 30) / 30);

		ctx.moveTo(i, canvas_height);
		ctx.lineTo(i, canvas_height - lineHeight);
		ctx.stroke();
	}
};
import * as ASSESS from './assess';

function drawConclusion(psr: any[]) {

	const assessment_emoji_container = g("assessment_emoji_container")!;
	const assessment_title_container = g("assessment_title_container")!;
	const assessment_description_container = g("assessment_description_container")!;
	let sum = 0;
	let count = 0;
	for (let i = 0; i < psr.length; i++) {
		if (!isNaN(psr[i])) {
			sum += psr[i];
			count++;
		}
	}

	const psrs_of_bins_with_high_true_peak = psr
		.filter((psr: any, i: number) => true_peak[i] >= -7)
		.filter((val: number) => !isNaN(val));

	const min_psr = getMinOfArray(psrs_of_bins_with_high_true_peak);

	const median = sum / count;

	const plr = max_true_peak - integratedLoudness;

	const plr_assessment = ASSESS.PLR(plr);
	assessment_emoji_container.innerHTML = plr_assessment.emoji;
	assessment_title_container.innerHTML = plr_assessment.title;
	assessment_description_container.innerHTML = plr_assessment.description;

	const stats = [
		{
			"label": "Integrated loudness",
			"value": integratedLoudness,
			"unit": "LUFS",
			"assessment": ASSESS.integratedLoudness(integratedLoudness)
		},
		{
			"label": "Peak to integrated loudness ratio (PLR)",
			"value": plr,
			"unit": "LU",
			"assessment": ASSESS.PLR(plr).emoji
		},
		{
			"label": "Minimum peak to short-term loudness ratio (PSR)",
			"subtitle": "where true peak is above -7 dbTP",
			"value": min_psr,
			"unit": "LU",
			"assessment": ASSESS.minPSR(min_psr)
		},
		{
			"label": "Maximum true peak level",
			"value": max_true_peak,
			"unit": "dbTP",
			"assessment": ASSESS.maxTruePeak(max_true_peak)
		},
		{
			"label": "Average dynamic range",
			"value": median,
			"unit": "LU",
			"assessment": ""
		}
	];

	stats.forEach(stat => {
		const tr = document.createElement("tr");
		g("statTableBody").appendChild(tr);

		let td = document.createElement("td");
		td.innerHTML = stat.label;

		stat.subtitle && (td.innerHTML +=
			`<br><span style="font-size: small">${stat.subtitle}</span>`);

		tr.appendChild(td);

		td = document.createElement("td");
		const value_rounded = (Math.round(stat.value * 10) / 10).toFixed(1);
		td.innerHTML = value_rounded + " " + stat.unit;
		tr.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = stat.assessment;
		tr.appendChild(td);

	});

};



function drawPSRDiagram(loudness: number[]) {

	const loudness_canvas = g("psr_canvas") as HTMLCanvasElement;
	const canvas_width = loudness_canvas.getBoundingClientRect().width * 2;
	const canvas_height = loudness_canvas.getBoundingClientRect().height * 2;
	//set canvas height and width manually
	loudness_canvas.setAttribute("width", '' + canvas_width);
	loudness_canvas.setAttribute("height", '' + canvas_height);
	const ctx = loudness_canvas.getContext("2d")!;

	//calculate RMS for every pixel
	for (let i = 0; i < canvas_width; i++) {

		ctx.beginPath();
		ctx.lineWidth = 1;
		const psr_value = loudness[i];
		ctx.strokeStyle = ASSESS.getPSRColor(psr_value);

		//typical values in pop music are 20 to 3 LU
		const lineHeight = canvas_height * ((psr_value - 2) / 17);

		ctx.moveTo(i, canvas_height);
		ctx.lineTo(i, canvas_height - lineHeight);
		ctx.stroke();

	}
};

import WaveSurfer from 'wavesurfer.js';
document.addEventListener("DOMContentLoaded", function () {
	loudness_display = g("loudness_display");
	psr_display = g("psr_display");
	dbtp_display = g("dbtp_display");
	// wavesurfer = Object.create(WaveSurfer);

	wavesurfer = WaveSurfer.create({
		container: '#wave',
		waveColor: 'violet',
		progressColor: 'purple'
	});

	wavesurfer.on('ready', function () {
		startComputations(wavesurfer);
		g("loading_audio_file").style.display = "none";
		g("conducting_loudness_analysis").style.display = "block";
	});

	const display = g("rms_db_display");

	wavesurfer.on('audioprocess', function () {
		const position = wavesurfer.getCurrentTime() / wavesurfer.getDuration();
		refreshIndicators(position);
	});

	g('file_input').addEventListener('change', (evt) => {
		const file = (evt.target! as any).files[0];
		wavesurfer.loadBlob(file);
		dom.remove(g("choose_file_dialog"));
		g("loading_audio_file").style.display = "block";
	}, false);


	// grab impulse response via XHR for convolver node
	fetch("impulse responses/3sec-1-mono_44100.wav")
		.then(r => r.arrayBuffer())
		.then(buffer => wavesurfer.backend.ac.decodeAudioData(buffer))
		.then(audioBuffer => {
			impulseResponseBuffer = audioBuffer;
			console.log("Convolver buffer ready!");
		})
		.catch(e => console.log("Error with decoding audio data" + e.err));

});


function getLoudnessAtPosition(pos: number) {
	return Math.round(10 * (loudness[Math.round(pos * loudness.length)])) / 10;
};


function getPSRAtPosition(pos: number) {
	return Math.round(10 * psr[Math.round(pos * psr.length)]) / 10;
};

function getDBTPAtPosition(pos: number) {
	return Math.round(10 * true_peak[Math.round(pos * true_peak.length)]) / 10;
};

function refreshIndicators(time: number) {
	const ebu_lkfs = getLoudnessAtPosition(time);
	if (!isNaN(ebu_lkfs)) {
		loudness_display.innerHTML = (Math.round(ebu_lkfs * 10) / 10).toFixed(1) + " LUFS";
	} else {
		loudness_display.innerHTML = "No signal";
	}

	const psr_lu = getPSRAtPosition(time);
	if (!isNaN(psr_lu)) {
		psr_display.innerHTML = (Math.round(psr_lu * 10) / 10).toFixed(1) + " LU";
	} else {
		psr_display.innerHTML = "No signal";
	}

	const dbtp = getDBTPAtPosition(time);
	if (!isNaN(dbtp)) {
		if (dbtp > 0) {
			dbtp_display.style.color = "red";
		} else {
			dbtp_display.style.color = "";
		}
		dbtp_display.innerHTML = (Math.round(dbtp * 10) / 10).toFixed(1) + " dBTP";
	} else {
		dbtp_display.innerHTML = "No signal";
	}

};
