declare module '*.worklet.ts' {
  const url: string;
  export = url;
}
declare module 'worklet-loader!*' {
  const url: string;
  export = url;
}
