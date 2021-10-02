/* eslint-disable no-console */


function getMaxAbs(array: ArrayLike<number>): number {
	return Math.max(...Array.prototype.map.bind(array)(Math.abs));
	let maxAbs = -Infinity;


	const len = array.length;
	for (let i = 0; i < len; i++)
		if (Math.abs(array[i]) > maxAbs)
			maxAbs = Math.abs(array[i]);
	return maxAbs;
}



function absoluteValueToDBFS(value: number) {
	return 20 * Math.log10(value);
}
function makeSquareRootCurve(amount: number) {
	const curve = new Float32Array(amount);
	const slope = 1 / ((amount - 1) / 2);

	for (let i = 0; i < amount; i++) {
		if (i > (amount / 2)) {
			const sample_value = slope * i - 1;
			const target_value = Math.sqrt(sample_value);
			curve[i] = target_value;
		}
		else {
			curve[i] = 0;
		}
	}
	return curve;
};
export class R128 extends GainNode {

	private analyserPeak_L: AnalyserNode;
	private analyserPeak_R: AnalyserNode;
	private analyserRMS_L: AnalyserNode;
	private analyserRMS_R: AnalyserNode;
	private analyserEBU_S: AnalyserNode;
	private peakBuffer3Seconds: number[];
	private peakHistory3Seconds: number[];
	private lastCallToGetPeak: number | null = null;

	constructor(context: BaseAudioContext) {
		super(context, {
			gain: 1,
			channelCount: 2,
			channelCountMode: 'max',
			channelInterpretation: 'speakers'
		});


		this.analyserPeak_L = context.createAnalyser();
		this.analyserPeak_R = context.createAnalyser();

		this.analyserRMS_L = context.createAnalyser();
		this.analyserRMS_R = context.createAnalyser();
		this.analyserEBU_S = context.createAnalyser();

		this.peakBuffer3Seconds = Array(180);

		const ebu_splitter = context.createChannelSplitter(2);
		const peakSplitter = context.createChannelSplitter(2);

		//first stage shelving filter
		const highshelf_filter_L = context.createBiquadFilter();
		highshelf_filter_L.type = "highshelf";
		highshelf_filter_L.Q.value = 1;
		highshelf_filter_L.frequency.value = 1500;
		highshelf_filter_L.gain.value = 4;

		const highshelf_filter_R = context.createBiquadFilter();
		highshelf_filter_R.type = "highshelf";
		highshelf_filter_R.Q.value = 1;
		highshelf_filter_R.frequency.value = 1500;  //deduced with IIRFilter.getFrequencyResponse
		highshelf_filter_R.gain.value = 4;

		// second stage highpass filter
		const highpass_filter_L = context.createBiquadFilter();
		highpass_filter_L.frequency.value = 76;
		highpass_filter_L.Q.value = 1;
		highpass_filter_L.type = "highpass";

		const highpass_filter_R = context.createBiquadFilter();
		highpass_filter_R.frequency.value = 76;
		highpass_filter_R.Q.value = 1;
		highpass_filter_R.type = "highpass";

		//SQUARING EVERY CHANNEL
		const ebu_square_gain_L = context.createGain();
		ebu_square_gain_L.gain.value = 0;

		const ebu_square_gain_R = context.createGain();
		ebu_square_gain_R.gain.value = 0;

		const ebu_convolver_L = context.createConvolver();
		ebu_convolver_L.normalize = false;
		const ebu_convolver_R = context.createConvolver();
		ebu_convolver_R.normalize = false;

		const ebu_mean_gain_L = context.createGain();
		ebu_mean_gain_L.gain.value = 1 / (context.sampleRate * 3);
		const ebu_mean_gain_R = context.createGain();
		ebu_mean_gain_R.gain.value = 1 / (context.sampleRate * 3);

		const ebu_channel_summing_gain = context.createGain();

		this.analyserEBU_S = context.createAnalyser();
		this.analyserEBU_S.fftSize = 2048;

		//CONNECTING EBU GRAPH
		ebu_splitter.connect(highshelf_filter_L, 0, 0);
		ebu_splitter.connect(highshelf_filter_R, 1, 0);

		highshelf_filter_L.connect(highpass_filter_L);
		highshelf_filter_R.connect(highpass_filter_R);

		highpass_filter_L.connect(ebu_square_gain_L).connect(ebu_convolver_L).connect(ebu_mean_gain_L).connect(ebu_channel_summing_gain);
		highpass_filter_L.connect(ebu_square_gain_L.gain);

		highpass_filter_R.connect(ebu_square_gain_R).connect(ebu_convolver_R).connect(ebu_mean_gain_R).connect(ebu_channel_summing_gain);
		highpass_filter_R.connect(ebu_square_gain_R.gain);

		// ebu_square_gain_L.connect(ebu_convolver_L).connect(ebu_mean_gain_L).connect(ebu_channel_summing_gain);
		// ebu_square_gain_R.connect(ebu_convolver_R).connect(ebu_mean_gain_R).connect(ebu_channel_summing_gain);

		//Sum the signal
		// ebu_mean_gain_L.connect(ebu_channel_summing_gain);
		// ebu_mean_gain_R.connect(ebu_channel_summing_gain);

		ebu_channel_summing_gain.connect(this.analyserEBU_S);


		//SQUARING THE SIGNAL
		const squareGainRMS_L = context.createGain();
		squareGainRMS_L.gain.value = 0;
		const squareGainRMS_R = context.createGain();
		squareGainRMS_R.gain.value = 0;

		const gainAfterRMSSplitter_L = context.createGain();
		gainAfterRMSSplitter_L.gain.value = 1;
		const gainAfterRMSSplitter_R = context.createGain();
		gainAfterRMSSplitter_R.gain.value = 1;

		const rmsSplitter = context.createChannelSplitter(2);
		rmsSplitter.connect(gainAfterRMSSplitter_L, 0, 0);
		rmsSplitter.connect(gainAfterRMSSplitter_R, 1, 0);

		gainAfterRMSSplitter_L.connect(squareGainRMS_L);
		gainAfterRMSSplitter_L.connect(squareGainRMS_L.gain);
		gainAfterRMSSplitter_R.connect(squareGainRMS_R);
		gainAfterRMSSplitter_R.connect(squareGainRMS_R.gain);

		const rms_convolver_L = context.createConvolver();
		rms_convolver_L.normalize = false;
		const rms_convolver_R = context.createConvolver();
		rms_convolver_R.normalize = false;

		// grab audio track for convolver node
		fetch("https://fuckingdj.blob.core.windows.net/test/impulse%20responses_3sec-1-mono_44100.wav")
			.then(r => r.arrayBuffer())
			.then(b => context.decodeAudioData(b))
			.then(audioBuffer => {
				rms_convolver_L.buffer = audioBuffer;
				rms_convolver_R.buffer = audioBuffer;
				ebu_convolver_L.buffer = audioBuffer;
				ebu_convolver_R.buffer = audioBuffer;
				console.log("Convolver buffer set!");
			});

		squareGainRMS_L.connect(rms_convolver_L);
		squareGainRMS_R.connect(rms_convolver_R);

		const squareRootNodeRMS_L = context.createWaveShaper();
		const squareRootNodeRMS_R = context.createWaveShaper();



		squareRootNodeRMS_L.curve = makeSquareRootCurve(40000000);
		squareRootNodeRMS_R.curve = makeSquareRootCurve(40000000);
		squareRootNodeRMS_L.oversample = "4x";
		squareRootNodeRMS_R.oversample = "4x";

		const gainAfterConvolverRMS_L = context.createGain();
		gainAfterConvolverRMS_L.gain.value = (1 / (context.sampleRate * 3));
		const gainAfterConvolverRMS_R = context.createGain();
		gainAfterConvolverRMS_R.gain.value = (1 / (context.sampleRate * 3));

		rms_convolver_L.connect(gainAfterConvolverRMS_L).connect(squareRootNodeRMS_L).connect(this.analyserRMS_L);
		// rms_convolver_L.connect(gainAfterConvolverRMS_L);
		rms_convolver_R.connect(gainAfterConvolverRMS_R).connect(squareRootNodeRMS_R).connect(this.analyserRMS_R);

		// gainAfterConvolverRMS_L.connect(squareRootNodeRMS_L);
		// gainAfterConvolverRMS_R.connect(squareRootNodeRMS_R);

		// squareRootNodeRMS_L.connect(this.analyserRMS_L);
		// squareRootNodeRMS_R.connect(this.analyserRMS_R);

		this.connect(ebu_splitter);
		this.connect(rmsSplitter);
		this.connect(peakSplitter);

		peakSplitter.connect(this.analyserPeak_L, 0, 0);
		peakSplitter.connect(this.analyserPeak_R, 1, 0);

		this.analyserPeak_L.fftSize = 32768;
		this.analyserPeak_L.smoothingTimeConstant = 0;

		this.analyserPeak_R.fftSize = 32768;
		this.analyserPeak_R.smoothingTimeConstant = 0;

		this.analyserRMS_L.fftSize = 2048;
		this.analyserRMS_R.fftSize = 2048;

		this.peakHistory3Seconds = new Array(180);
		this.lastCallToGetPeak = null;

	}


	getPeak() {
		const dataPeak_L = new Float32Array(this.analyserPeak_L.frequencyBinCount);
		const dataPeak_R = new Float32Array(this.analyserPeak_R.frequencyBinCount);
		this.analyserPeak_L.getFloatTimeDomainData(dataPeak_L);
		this.analyserPeak_R.getFloatTimeDomainData(dataPeak_R);
		const max_L = getMaxAbs(dataPeak_L);
		const max_R = getMaxAbs(dataPeak_R);
		const max = getMaxAbs([max_L, max_R]);
		this.peakHistory3Seconds.splice(0, 1);
		this.peakHistory3Seconds.push(max);
		const maxOf3Seconds = getMaxAbs(this.peakHistory3Seconds);

		this.lastCallToGetPeak = this.context.currentTime;

		return absoluteValueToDBFS(maxOf3Seconds);
	}




	getRMS() {
		const dataArrayRMS_L = new Float32Array(this.analyserRMS_L.frequencyBinCount);
		const dataArrayRMS_R = new Float32Array(this.analyserRMS_R.frequencyBinCount);
		this.analyserRMS_L.getFloatTimeDomainData(dataArrayRMS_L);
		this.analyserRMS_R.getFloatTimeDomainData(dataArrayRMS_R);
		return [
			absoluteValueToDBFS(dataArrayRMS_L[0] * Math.SQRT2),
			absoluteValueToDBFS(dataArrayRMS_R[1] * Math.SQRT2)
		] as const;
	}


	getShortTermLoudness() {
		const dataArrayEBU_S = new Float32Array(this.analyserEBU_S.frequencyBinCount);
		this.analyserEBU_S.getFloatTimeDomainData(dataArrayEBU_S);
		const ebu_lkfs = -0.691 + (10 * Math.log10(dataArrayEBU_S[0]));
		return ebu_lkfs;
	}


	getPSR() {
		return this.getPeak() - this.getShortTermLoudness();
	}






}
