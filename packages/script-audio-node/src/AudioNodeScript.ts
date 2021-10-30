import { ParameterData } from "./ParameterData";

export type AudioNodeScript = (inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<keyof ParameterData, Float32Array>) => boolean;
