import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { RuleSetRule } from 'webpack';
import {
  babelLoader, cssHotLoader, cssHotModuleLoader, cssLoader, cssModuleLoader, fontLoader,
  imageLoader, nodeLoader, postcssLoader, sassLoader, tsLoader, workletLoader
} from './loaders';
import { isDev } from './settings';

const node_modules = /node_modules/i;
//#region code

export const workletRule: RuleSetRule = {
  test: /\.worklet\.ts$/,
  use: [workletLoader],
};
export const reactTypescriptRule: RuleSetRule = {
  test: /\.tsx?$/i,
  exclude: node_modules,
  use: ['react-hot-loader/webpack'],
};
export const typescriptRule: RuleSetRule = {
  test: /\.ts$/i,
  use: [tsLoader],
};
export const scriptRule: RuleSetRule = {
  test: /\.(j|t)sx?$/i,
  exclude: [node_modules],
  use: [babelLoader],
};
export const nodeRule: RuleSetRule = {
  test: /\.node$/i,
  use: nodeLoader,
};

export const workerRule: RuleSetRule = {
  test: /\.worker\.ts$/i,
  use: ['worker-loader', tsLoader],
  loader: "worker-loader",
  options: {

  },
};


//#endregion

//#region styles
export const globalStylesheetRule: RuleSetRule = {
  test: /\b(global|vars)\.s?css$/i,
  use: [...(isDev ? [cssHotLoader] : []), MiniCssExtractPlugin.loader, cssLoader, postcssLoader, sassLoader],
};
export const stylesheetRule: RuleSetRule = {
  test: /\.s?css$/i,
  exclude: /\b(global|vars)\.s?css$/i,
  use: [...(isDev ? [cssHotModuleLoader] : []), MiniCssExtractPlugin.loader, cssModuleLoader, postcssLoader, sassLoader],
};
//#endregion

//#region assets
// export const assetRule:RuleSetRule = {
//   test: /\.(png|svg|jpg|jpeg|gif)$/i,
//   type: 'asset/resource',
// };
export const imageRule: RuleSetRule = {
  test: /\.(png|jpg|gif)$/i,
  use: [imageLoader],
};

export const fontRule: RuleSetRule = {
  test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
  use: [fontLoader],
};

export const htmlRule: RuleSetRule = {
  test: /\.(html)$/i,
  use: ['html-loader'],
};
//#endregion
