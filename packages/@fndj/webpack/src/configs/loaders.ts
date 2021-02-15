import postcssImport = require('postcss-import');
import postcssPresetEnv = require('postcss-preset-env');
import { RuleSetLoader } from 'webpack';
import { isDev } from './settings';

export const cssModuleLoader:RuleSetLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 2,
    modules: true,
    import: true,
    sourceMap: isDev,
  },
};
export const cssHotLoader:RuleSetLoader = {
  loader: 'css-hot-loader',
};
export const cssHotModuleLoader:RuleSetLoader = {
  loader: 'css-hot-loader',
  options: {
    cssModule: true,
  },
};
export const cssLoader:RuleSetLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 2,
    modules: false,
    sourceMap: isDev,
  },
};
export const sassLoader:RuleSetLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: isDev,
  },
};
export const postcssLoader:RuleSetLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    sourceMap: isDev,
    plugins: () => [postcssImport(), postcssPresetEnv()],
  },
};
export const fileLoader:RuleSetLoader = {
  loader: 'file-loader?name=[name]__[hash:base64:5].[ext]',
};
export const threadLoader:RuleSetLoader = {
  loader: 'thread-loader',
};
export const electronMainBabelLoader:RuleSetLoader = {
  loader: 'babel-loader',
  options: {
    presets: [
      [
        '@babel/preset-env',
        {
          debug: isDev,
          modules: false,
          targets: {
            electron: '6.0.12',
          },
        },
      ],
    ],
  },
};
export const fontLoader:RuleSetLoader = {
  loader: 'url-loader',
  options: {
    name: 'fonts/[name]--[folder].[ext]',
    limit: 10240,
    // mimetype: 'application/font-woff'
  },
};
export const imageLoader:RuleSetLoader = {
  loader: 'url-loader',
  options: {
    limit: 10240,
    name: 'imgs/[name]--[folder].[ext]',
  },
};
 export const tsLoader:RuleSetLoader = {
  loader: 'ts-loader',
  options: {
    transpileOnly: isDev,
    // projectReferences: true,
    // appendTsSuffixTo: [{}],
    // configFile: "C:\\dev\\fndebrid\\tsconfig.json"
  },
};

export const workerLoader:RuleSetLoader = {
  loader: 'worker-loader',
  options: {
    publicPath: "/scripts/workers/",
    filename: "[name].[contenthash].worker.js",
    chunkFilename: "[id].[contenthash].worker.js",
    esModule: true,
  }
}

export const jsLoader:RuleSetLoader = {
  loader: 'babel-loader',
  options: {
    presets: [
      [
        '@babel/preset-env',
        {
          debug: isDev,
          modules: false,
          targets: {
            electron: '6.0.12',
          },
        },
      ],
    ],
  },
};

export const babelLoader:RuleSetLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    babelrc: false,
    presets: [
      [
        '@babel/preset-env',
        { targets: { browsers: 'last 2 versions' } }, // or whatever your project requires
      ],
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
    plugins: [
      // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      'react-hot-loader/babel',
    ],
  },
};


export const workletLoader:RuleSetLoader = {
  loader: 'worklet-loader',
  options: {
    name: 'js/[hash].worklet.js'
  }
}
