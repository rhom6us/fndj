import { RuleSetRule } from 'webpack';
import * as loaders from './loaders';
import { isDev } from './settings';


const node_modules = /node_modules/i;
//#region code

export const workletQueryRule:RuleSetRule = {
  resourceQuery: /worklet/,
  // type: 'asset/resource',
  use: [
    loaders.worklet_loader,
  ],
}
export const workletRule: RuleSetRule = {
  test: /\.worklet\.ts$/i,
  exclude: node_modules,
  use: [
    loaders.worklet_loader,
  ],
};
export const workerRule: RuleSetRule = {
  test: /\.worker\.ts$/i,
  exclude: node_modules,
  use: [loaders.worker_loader],
};
export const wasmRule: RuleSetRule = {
  test: /\.wasm$/i,
  exclude: node_modules,
  // type: 'asset/inline', // makes a data uri
  type: 'asset/resource', // emits a file
};
export const wavRule: RuleSetRule = {
  test: /\.wav$/i,
  exclude: node_modules,
  // type: 'asset/inline', // makes a data uri
  type: 'asset/resource', // emits a file
};
export const typescriptRule: RuleSetRule = {
  test: /\.[tj]sx?$/i,
  exclude: [node_modules],
  use: [
    loaders.babel('top_level_await', 'class_properties'),
    ...ifDev(loaders.typescript('react_refresh', 'transpile_only')),
    ...ifProd(loaders.typescript()),
  ],
};

// export const jsRule: RuleSetRule = {
//   test: /\.js$/i,
//   exclude: [node_modules],
//   use: [loaders.ts_with_react_refresh_loader],
// };
// export const scriptRule: RuleSetRule = {
//   test: /\.(j|t)sx?$/i,
//   exclude: [node_modules],
//   use: [babelLoader],
// };
export const nodeRule: RuleSetRule = {
  test: /\.node$/i,
  use: loaders.node_loader,
};




//#endregion

//#region styles
export const globalStylesheetRule: RuleSetRule = {
  test: /\b(global|vars)\.s?css$/i,
  use: [
    ...ifDev(loaders.cssHotLoader),
    loaders.cssExtractLoader,
    loaders.cssLoader,
    loaders.postcssLoader,
    loaders.sassLoader
  ],
};
export const stylesheetRule: RuleSetRule = {
  test: /\.s?css$/i,
  exclude: /\b(global|vars)\.s?css$/i,
  use: [
    ...ifDev(loaders.cssHotModuleLoader),
    loaders.cssExtractLoader,
    loaders.cssModuleLoader,
    loaders.postcssLoader,
    loaders.sassLoader
  ],
};
//#endregion

//#region assets
// export const assetRule:RuleSetRule = {
//   test: /\.(png|svg|jpg|jpeg|gif)$/i,
//   type: 'asset/resource',
// };
export const imageRule: RuleSetRule = {
  test: /\.(png|jpg|gif)$/i,
  type: 'asset',
  // use: [loaders.imageLoader],
};

export const fontRule: RuleSetRule = {
  test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
  type: 'asset',
  // use: [loaders.fontLoader],
};

export const htmlRule: RuleSetRule = {
  test: /\.(html)$/i,
  use: ['html-loader'],
};
//#endregion


function ifDev<T extends any[]>(...values: T): T | [] {
  if (isDev) {
    return values;
  }
  return [];
}

function ifProd<T extends any[]>(...values: T): T | [] {
  if (!isDev) {
    return values;
  }
  return [];
}
