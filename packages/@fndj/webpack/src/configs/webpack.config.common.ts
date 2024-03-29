
import path from 'path';
import * as plugins from './plugins';
import { entryPoint, isDev, outDir, projectDir } from './settings';
export default {
  devtool: 'eval-source-map',
  context: projectDir,
  entry: path.join(projectDir, entryPoint),
  output: {
    path: outDir,
    filename: `[name]${isDev ? '' : '.[contenthash]'}.js`,
    // chunkFilename: `[name]${isDev ? '' : '.[contenthash]'}.js`,
    //  devtoolModuleFilenameTemplate: 'ala:///[resource-path]?[loaders]',
    // devtoolModuleFilenameTemplate: (info: Record<'absoluteResourcePath'|'allLoaders'|'hash'|'id'|'loaders'|'resource'|'resourcePath'|'namespace', string>) => {
    //   const result = `alla://@fndj/${path.relative(rootDir, path.resolve(info.absoluteResourcePath).replace(/\\/g, "/"))}`;
    //   console.log(result);
    // }

    // devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, "/"),

  },
  stats: {
    // warnings: false,
    // warningsFilter: /export .* was not found in/,
  },
  resolve: {
    fallback: {
      url: require.resolve('url'),
      crypto: false /*require.resolve('crypto-browserify')*/,
      path: false /*require.resolve('path-browserify')*/,
      os: false /*require.resolve('os-browserify/browser')*/,
      http: false /*require.resolve('stream-http')*/,
      stream: false /*require.resolve('stream-browserify')*/,
      zlib: false /*require.resolve('zlib-browserify')*/,
      util: false /*require.resolve('util/')*/,
      child_process: false,
      http2: false, //require.resolve('spdy-or-http2'),

      dns: false /*require.resolve('chrome-dns')*/,
      net: false /*require.resolve('net-browserify')*/,
      tls: false /*require.resolve('util/')*/,
      fs: false /*require.resolve('util/')*/,

    },
    alias: {
      // '@': path.resolve(rendererSourceDir),
      // '~main': path.resolve(mainSourceDir),
      // '~renderer': path.resolve(rendererSourceDir),
      // '~common': path.resolve(commonSourceDir),
      // common: path.resolve(commonSourceDir),
    },
    extensions: ['.js', '.ts', '.json'],
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
    // plugins.nodePolyfill,
    // isDev && plugins.webpackBar,
    plugins.tsChecker,
    // plugins.cleanBuildDir,
    // plugins.defineStaticDirConst,
    // plugins.defineNodeEnvConst,
  ].filter(Boolean),
  module: {
    rules: [
    ],
  },
  experiments: {
    topLevelAwait: true,
    asset: true,
  }
};// as webpack.Configuration;
