/* eslint-disable no-console */
/* eslint-disable no-undef */
onmessage = function (e) {
    let progress_percent = 0;
    let progress_percent_old = 0;
    const ebu_buffer = e.data.ebu_buffer;
    const untouched_buffers = e.data.untouched_buffers;
    const width = e.data.width;
    const loudness = new Float64Array(width);
    const psr = new Float32Array(width);
    console.log("Starting with analysing loudness");

    // let's calculate a short term loudness and psr value for each "pixel" of
    // the canvas
    for (let i = 0; i < width; i++) {

        // get the sample position in the buffer, that corresponds to this pixel
        const absoluteSamplePos = Math.round(i / width * ebu_buffer.length);
        // and get the short-term loudness for this position in LKFS
        loudness[i] = -0.691 + (10 * Math.log10(ebu_buffer[absoluteSamplePos]));
        //then get PSR value
        psr[i] = getPSRAtSamplePosition(untouched_buffers, absoluteSamplePos, loudness[i]);

        progress_percent = Math.round(i / width * 100);
        if (progress_percent != progress_percent_old) {
            postMessage({ type: "progress", progress: progress_percent });
            progress_percent_old = progress_percent;
        }

    }

    const response = {
        type: "finished",
        loudness: loudness,
        psr: psr
    };

    postMessage(response);

};


function absoluteValueToDBFS(value) {
    return 20 * Math.log10(value);
}


function getAbsMaxOfArray(numArray) {
    // returning Math.max.apply(null, numArray)
    // will result in "Uncaught RangeError: Maximum call stack size exceeded"
    let max_pos = 0;
    for (let i = 1; i < numArray.length; i++) {
        if (Math.abs(numArray[i]) > Math.abs(numArray[max_pos])) {
            max_pos = i;
        }
    }
    return Math.abs(numArray[max_pos]);
}


// function getMaxOfArray(numArray) {
// 	// returning Math.max.apply(null, numArray);
// 	// will result in "Uncaught RangeError: Maximum call stack size exceeded"
// 	let max_pos = 0;
// 	for (let i = 1; i < numArray.length; i++){
// 		if (numArray[i] > numArray[max_pos]){
// 			max_pos = i;
// 		}
// 	}
// 	return numArray[max_pos];
// }


function getPSRAtSamplePosition(buffers, samplePos, loudness_value) {

    /*
        To measure the peak to short-term loudness, we look for the peak in
        the last 3 seconds of the untouched buffers.
        Then we subtract the short-term loudness value of around that point in
        time.
    */

    const time_frame = 3; //seconds
    const samplesCount = Math.round(44100 * time_frame);
    // const length = buffers[0].length;

    //put all samples of all channels in one array
    const samples = new Float32Array(buffers.length * samplesCount);
    let i = 0;

    for (let c = 0; c < buffers.length; c++) {
        for (let s = samplePos - samplesCount; s <= samplePos; s++) {
            if (s >= 0) {
                samples[i] = buffers[c][s];
            } else {
                samples[i] = 0;
            }
            i++;
        }
    }

    const x_peak = getAbsMaxOfArray(samples);
    const x_peak_db = absoluteValueToDBFS(x_peak);
    const psr = x_peak_db - loudness_value;
    return psr;
}
