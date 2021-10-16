import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { RuleSetRule } from 'webpack';
import * as loaders from './loaders';
import { isDev } from './settings';


const node_modules = /node_modules/i;
//#region code

export const workletRule: RuleSetRule = {
  test: /\.worklet\.ts$/,
  exclude: node_modules,
  use: [loaders.workletLoader, loaders.tsLoader],
};
export const workerRule: RuleSetRule = {
  test: /\.worker\.ts$/i,
  exclude: node_modules,
  use: [loaders.workerLoader],
};
export const wasmRule: RuleSetRule = {
  test: /\.wasm$/i,
  exclude: node_modules,
  type: 'asset/inline', // makes a data uri
  // type: 'asset/resource', // emits a file
};
export const waveRule: RuleSetRule = {
  test: /\.wav$/i,
  exclude: node_modules,
  // type: 'asset/inline', // makes a data uri
  type: 'asset/resource', // emits a file
};
export const reactTypescriptRule: RuleSetRule = {
  test: /\.[tj]sx?$/i,
  exclude: [node_modules, workletRule.test],
  use: [
    ...ifDev(loaders.reactRefreshLoader),
    loaders.tsLoader
  ],
};
export const typescriptRule: RuleSetRule = {
  test: /\.ts$/i,
  exclude: [node_modules, workletRule.test],
  use: [loaders.tsLoader],
};
export const jsRule: RuleSetRule = {
  test: /\.js$/i,
  exclude: [node_modules],
  use: [loaders.tsLoader],
};
// export const scriptRule: RuleSetRule = {
//   test: /\.(j|t)sx?$/i,
//   exclude: [node_modules],
//   use: [babelLoader],
// };
export const nodeRule: RuleSetRule = {
  test: /\.node$/i,
  use: loaders.nodeLoader,
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
  use: [loaders.imageLoader],
};

export const fontRule: RuleSetRule = {
  test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
  use: [loaders.fontLoader],
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
