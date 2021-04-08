
import path from 'path';
import webpack from 'webpack';
import * as plugins from './plugins';
import { entryPoint, isDev, outDir, projectDir } from './settings';

export default {
  devtool: "source-map",// isDev ? 'eval-cheap-module-source-map' : undefined, // 'eval-source-map',
  context: projectDir,
  entry: entryPoint,
  output: {
    path: outDir,
    filename: `[name]${isDev ? '' : '.[contenthash]'}.js`,
    chunkFilename: `[name]${isDev ? '' : '.[contenthash]'}.js`,
  },
  stats: {
    warnings: false,
    warningsFilter: /export .* was not found in/,
  },
  resolve: {
    alias: {
      // '@': path.resolve(rendererSourceDir),
      // '~main': path.resolve(mainSourceDir),
      // '~renderer': path.resolve(rendererSourceDir),
      // '~common': path.resolve(commonSourceDir),
      // common: path.resolve(commonSourceDir),
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.js', '.ts', '.json', '.node'],
  },
  // node: {
  //   __dirname: true,
  //   __filename: true,
  // },
  // optimization: {
  //   nodeEnv: process.env.NODE_ENV,
  //   namedModules: true,
  //   noEmitOnErrors: true,
  //   // moduleIds: 'hashed',
  //   // runtimeChunk: 'single',
  //   // splitChunks: {
  //   //   cacheGroups: {
  //   //     vendor: {
  //   //       test: /[\\/]node_modules[\\/]/,
  //   //       name: 'vendor',
  //   //       chunks: 'all',
  //   //     },
  //   //   },
  //   // },
  // },
  plugins: [
    plugins.webpackBar,
    plugins.tsChecker,
    // plugins.cleanBuildDir,
    // plugins.defineStaticDirConst,
    // plugins.defineNodeEnvConst,
  ],
  module: {
    rules: [
    ],
  },
};// as webpack.Configuration;
