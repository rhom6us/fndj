registerProcessor("fn-formula", class extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      {
        name: "arg1",
        automationRate: "a-rate"
      },
      {
        name: "arg2",
        automationRate: "a-rate"
      },
      {
        name: "arg3",
        automationRate: "a-rate"
      }
    ];
  }

  constructor(options) {
    super(options);
    this._fn = new Function(
      "x",
      "arg1",
      "arg2",
      "arg3",
      `return ${options.processorOptions.formula};`
    );
  }
  process(inputs, outputs, parameters) {
    for (let bus = 0; bus < Math.min(inputs.length, outputs.length); bus++) {
      for (
        let channel = 0;
        channel < Math.min(inputs[bus].length, outputs[bus].length);
        channel++
      ) {
        for (
          let sample = 0;
          sample <
          Math.min(inputs[bus][channel].length, outputs[bus][channel].length);
          sample++
        ) {
          outputs[bus][channel][sample] = this._fn(
            inputs[bus][channel][sample],
            parameters.arg1[sample],
            parameters.arg2[sample],
            parameters.arg3[sample]
          );
        }
      }
    }

    return false;
  }
});
