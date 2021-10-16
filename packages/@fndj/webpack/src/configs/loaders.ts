
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Rule } from 'postcss';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import type { RuleSetUseItem } from 'webpack';
import { isDev, targetElectronVersion } from './settings';




/**
 * Seperates css into a seperate bundle in order to prevent brief flash of unstyled content.
 */
export const cssExtractLoader: RuleSetUseItem = MiniCssExtractPlugin.loader;
export const cssHotLoader: RuleSetUseItem = {
  loader: 'css-hot-loader',
};
export const cssHotModuleLoader: RuleSetUseItem = {
  loader: 'css-hot-loader',
  options: {
    cssModule: true,
  },
};
export const cssLoader: RuleSetUseItem = {
  loader: 'css-loader',
  options: {
    importLoaders: 2,
    modules: false,
    sourceMap: isDev,
  },
};
export const cssModuleLoader: RuleSetUseItem = {
  loader: 'css-loader',
  options: {
    importLoaders: 2,
    modules: true,
    import: true,
    sourceMap: isDev,
  },
};

/** @deprecated  */
export const fileLoader: RuleSetUseItem = {
  loader: 'file-loader',
  options: {
    name: '[name]__[hash:base64:5].[ext]'
  }
};
/** @deprecated  */
export const fontLoader: RuleSetUseItem = {
  loader: 'url-loader',
  options: {
    name: 'fonts/[name]--[folder].[ext]',
    limit: 10240,
    // mimetype: 'application/font-woff'
  },
};
export const postcssLoader: RuleSetUseItem = {
  loader: 'postcss-loader',
  options: {
    sourceMap: isDev,
    postcssOptions: {
      plugins: [postcssImport(), postcssPresetEnv()]
    },
  },
};
export const sassLoader: RuleSetUseItem = {
  loader: 'sass-loader',
  options: {
    sourceMap: isDev,
  },
};
export const threadLoader: RuleSetUseItem = {
  loader: 'thread-loader',
};
// export const wasmLoader: RuleSetUseItem = {
//   loader: 'url-loader',
//   options: {
//     limit: 10240,
//     name: 'imgs/[name]--[folder].[ext]',
//   },
// };
/** @deprecated  */
export const imageLoader: RuleSetUseItem = {
  loader: 'url-loader',
  options: {
    limit: 10240,
    name: 'imgs/[name]--[folder].[ext]',
  },
};
export const workletLoader: RuleSetUseItem = {
  loader: 'worklet-loader',
  options: {
    inline: false
  }
};

export const workerLoader: RuleSetUseItem = {
  loader: 'worker-loader',
  options: {
    publicPath: "/scripts/workers/",
    filename: "[name].[contenthash].worker.js",
    chunkFilename: "[id].[contenthash].worker.js",
    esModule: true,
  }
};
export const reactRefreshLoader: RuleSetUseItem = {
  loader: 'babel-loader',
  options: { plugins: ['react-refresh/babel', '@babel/plugin-syntax-top-level-await', '@babel/plugin-proposal-class-properties'] },
};
export const tsLoader: RuleSetUseItem = {
  loader: 'ts-loader',
  options: {
    transpileOnly: isDev

    // projectReferences: true,
    // appendTsSuffixTo: [{}],
    // configFile: "C:\\dev\\fndebrid\\tsconfig.json"
  },
};


export const nodeLoader: RuleSetUseItem = {
  loader: 'node-loader'
};
