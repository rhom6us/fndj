/* eslint-disable no-redeclare */
/* eslint-disable no-var */
/* eslint-disable no-console */
/* eslint-disable no-undef */
onmessage = function (e) {

	const buffers = e.data.buffers;
	const channelCount = e.data.buffers.length;
	const gatingBlockLength = 0.4;
	const channelWeightings = [1, 1];
	const absoluteGatingThreshold = -70; //LKFS
	const duration = e.data.duration; //seconds
	//var sampleRate = e.data.sampleRate;
	const overlap = 0.25;
	const step = 1 - overlap;
	const numberOfGatingBlocks = Math.floor((duration - gatingBlockLength) / (gatingBlockLength * step));
	console.log("numberOfGatingBlocks", numberOfGatingBlocks);
	const gatingBlockLoudnesses = new Array(numberOfGatingBlocks);
	const channelGatingBlockMS = new Array(channelCount);
	for (var c = 0; c < channelCount; c++) {
		channelGatingBlockMS[c] = new Array(numberOfGatingBlocks);
	}
	const gatingBlockMSesAboveAbsThreshold = [];

	function getSampleIndexAtTime(time, buffers, duration) {
		const samplesPerChannel = buffers[0].length;
		const relativePosition = time / duration;
		return Math.floor(relativePosition * samplesPerChannel);
	}

	function getLoudnessOfGatingBlockMSes(MSes) {

		let sum = 0;
		for (let c = 0; c < channelCount; c++) {
			sum += channelWeightings[c] * MSes[c];
		}

		return -0.691 + (10 * Math.log10(sum));

	}

	// get MSes of all channel blocks
	for (var b = 0; b < numberOfGatingBlocks; b++) {
		const startSampleIndex = getSampleIndexAtTime(gatingBlockLength * b * step, buffers, duration);
		const endSampleIndex = getSampleIndexAtTime(gatingBlockLength * (b * step + 1), buffers, duration);
		const numberOfSamplesInBlock = endSampleIndex - startSampleIndex;

		for (var c = 0; c < channelCount; c++) {
			var sum = 0;
			for (let s = startSampleIndex; s < endSampleIndex; s++) {
				sum += buffers[c][s];
			}
			//channelGatingBlockMS[c][b] = (1 / gatingBlockLength) * sum;
			channelGatingBlockMS[c][b] = (1 / numberOfSamplesInBlock) * sum;
		}
	}


	//get gating block loudness values and get blocks above absolute threshold
	for (var b = 0; b < numberOfGatingBlocks; b++) {
		gatingBlockLoudnesses[b] = getLoudnessOfGatingBlockMSes([
			channelGatingBlockMS[0][b],
			channelGatingBlockMS[1][b],
		]);

		if (gatingBlockLoudnesses[b] > absoluteGatingThreshold) {
			gatingBlockMSesAboveAbsThreshold.push([
				channelGatingBlockMS[0][b],
				channelGatingBlockMS[1][b]
			]); //MS values for both channels for this block

			//optimize!
		}

	}

	const numberOfBlocksAboveAbsThreshold = gatingBlockMSesAboveAbsThreshold.length;

	//compute relative threshold
	var sum = 0;
	for (var c = 0; c < channelCount; c++) {

		var channelSum = 0;
		for (var b = 0; b < numberOfBlocksAboveAbsThreshold; b++) {
			channelSum += gatingBlockMSesAboveAbsThreshold[b][c];
		}

		sum += channelWeightings[c] * (1 / numberOfBlocksAboveAbsThreshold) * channelSum;
	}
	const relativeThreshold = -0.691 + (10 * Math.log10(sum)) - 10; //LKFS

	const gatingBlockMSesAboveBothThresholds = gatingBlockMSesAboveAbsThreshold
		.filter(MSes => {
			return (getLoudnessOfGatingBlockMSes(MSes) > relativeThreshold);
		});

	//compute loudness of gating blocks above both thresholds
	var sum = 0;
	for (var c = 0; c < channelCount; c++) {
		var channelSum = 0;
		for (var b = 0; b < gatingBlockMSesAboveBothThresholds.length; b++) {
			channelSum += gatingBlockMSesAboveBothThresholds[b][c];
		}

		sum += channelWeightings[c] * (1 / gatingBlockMSesAboveBothThresholds.length * channelSum);

	}

	const gatedLoudness = -0.691 + (10 * Math.log10(sum));

	const response = {
		type: "finished",
		integratedLoudness: gatedLoudness
	};

	postMessage(response);

};
