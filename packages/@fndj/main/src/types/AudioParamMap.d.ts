export {};

declare global {
  interface AudioParamMap extends Map<string, AudioParam> {}
}
