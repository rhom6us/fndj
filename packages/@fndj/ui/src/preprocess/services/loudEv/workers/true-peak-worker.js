/* eslint-disable no-undef */


onmessage = function (e) {
    let progress_percent = 0;
    let progress_percent_old = 0;
    const buffers = e.data.buffers;
    const width = e.data.width;
    const true_peak = new Float64Array(width);
    let max = 0;

    // let's calculate a true peak value for each "pixel" of the canvas
    for (let i = 0; i < width; i++) {

        // get the sample position in the buffer, that corresponds to this pixel
        const absoluteSamplePos = Math.round(i / width * buffers[0].length);
        // and get the short-term loudness for this position in LKFS
        true_peak[i] = getDBTPAtSamplePosition(buffers, absoluteSamplePos);

        progress_percent = Math.round(i / width * 100);
        if (progress_percent != progress_percent_old) {
            postMessage({ type: "progress", progress: progress_percent });
            progress_percent_old = progress_percent;
        }

    }

    max = getMaxOfArray(true_peak);

    const response = {
        type: "finished",
        true_peak,
        max
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


function getMaxOfArray(numArray) {
    // returning Math.max.apply(null, numArray);
    // will result in "Uncaught RangeError: Maximum call stack size exceeded"
    let max_pos = 0;
    for (let i = 1; i < numArray.length; i++) {
        if (numArray[i] > numArray[max_pos]) {
            max_pos = i;
        }
    }
    return numArray[max_pos];
}


function getDBTPAtSamplePosition(buffers, samplePos) {

    const time_frame = 0.5; //seconds
    const numberOfSamples = Math.round(192000 * time_frame);
    // const lengthOfLeftBuffer = buffers[0].length;
    const channelCount = buffers.length;

    //put all samples of all channels in one array
    const samples = new Float32Array(channelCount * numberOfSamples);
    let i = 0;

    for (let c = 0; c < channelCount; c++) {
        for (let s = samplePos - numberOfSamples; s <= samplePos; s++) {
            if (s >= 0) {
                samples[i] = buffers[c][s];
            } else {
                samples[i] = 0;
            }
            i++;
        }
    }

    const value = getAbsMaxOfArray(samples);
    const value_db = absoluteValueToDBFS(value) + 6.02; //restore original gain
    return value_db;
}
