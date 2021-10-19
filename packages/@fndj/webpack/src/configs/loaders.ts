import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import type { RuleSetUseItem } from 'webpack';
import { isDev } from './settings';

function onlyif<T extends any[]>(test: boolean, ...args: T): T | []{
  if (test) {
    return args;
  }
  return [];
}



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

/** @deprecated use asset/resource */
export const fileLoader: RuleSetUseItem = {
  loader: 'file-loader',
  options: {
    name: '[name]__[hash:base64:5].[ext]'
  }
};
/** @deprecated use asset/inline */
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
/** @deprecated use asset/inline */
export const imageLoader: RuleSetUseItem = {
  loader: 'url-loader',
  options: {
    limit: 10240,
    name: 'imgs/[name]--[folder].[ext]',
  },
};
export const worklet_loader: RuleSetUseItem = {
  loader: 'worklet-loader',
  options: {
    inline: false
  }
};

export const worker_loader: RuleSetUseItem = {
  loader: 'worker-loader',
  options: {
    publicPath: "/scripts/workers/",
    filename: "[name].[contenthash].worker.js",
    chunkFilename: "[id].[contenthash].worker.js",
    esModule: true,
  }
};
export const experimental_ts_features_loader: RuleSetUseItem = {
  loader: 'babel-loader',
  options: { plugins: [/*'react-refresh/babel', */'@babel/plugin-syntax-top-level-await', '@babel/plugin-proposal-class-properties'] },
};
export function babel(...features: Array<'top_level_await' | 'class_properties'>) {
  return {
    loader: require.resolve('babel-loader'),
    options: {
      plugins: [
        ...onlyif(features.includes('top_level_await'), '@babel/plugin-syntax-top-level-await'),
        ...onlyif(features.includes('class_properties'), '@babel/plugin-proposal-class-properties'),
      ]
    }
  }
}
export function typescript(...features: Array<'react_refresh' | 'transpile_only'>): RuleSetUseItem {
  return {
    loader: require.resolve('ts-loader'),
    options: {
      getCustomTransformers: () => ({
        before: onlyif(features.includes('react_refresh'), ReactRefreshTypeScript()),
      }),
      transpileOnly: features.includes('transpile_only')
      // configFile: "C:\\dev\\fndebrid\\tsconfig.json"
    },
  };
}

export const node_loader: RuleSetUseItem = {
  loader: 'node-loader'
};
