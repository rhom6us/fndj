declare module '*.worker.ts' {
  const worker: Worker;
  export default worker;
}
declare module 'worker-loader!*' {
  const worker: Worker;
  export = worker;
}
