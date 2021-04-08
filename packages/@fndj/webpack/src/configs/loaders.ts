import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import type { RuleSetUseItem } from 'webpack';
import { isDev } from './settings';
export const cssModuleLoader: RuleSetUseItem = {
  loader: 'css-loader',
  options: {
    importLoaders: 2,
    modules: true,
    import: true,
    sourceMap: isDev,
  },
};
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
export const sassLoader: RuleSetUseItem = {
  loader: 'sass-loader',
  options: {
    sourceMap: isDev,
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
export const fileLoader: RuleSetUseItem = {
  loader: 'file-loader?name=[name]__[hash:base64:5].[ext]',
};
export const threadLoader: RuleSetUseItem = {
  loader: 'thread-loader',
};
export const electronMainBabelLoader: RuleSetUseItem = {
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
export const fontLoader: RuleSetUseItem = {
  loader: 'url-loader',
  options: {
    name: 'fonts/[name]--[folder].[ext]',
    limit: 10240,
    // mimetype: 'application/font-woff'
  },
};
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
    name: 'js/[hash].worklet.js'
  }
}

export const workerLoader: RuleSetUseItem = {
  loader: 'worker-loader',
  options: {
    publicPath: "/scripts/workers/",
    filename: "[name].[contenthash].worker.js",
    chunkFilename: "[id].[contenthash].worker.js",
    esModule: true,
  }
}
export const reactRefreshLoader: RuleSetUseItem = {
  loader: 'babel-loader',
  options: { plugins: ['react-refresh/babel', '@babel/plugin-syntax-top-level-await'] },
};
export const tsLoader: RuleSetUseItem = {
  loader: 'ts-loader',
  options: {
    transpileOnly: isDev,
    // projectReferences: true,
    // appendTsSuffixTo: [{}],
    // configFile: "C:\\dev\\fndebrid\\tsconfig.json"
  },
};


// export const jsLoader: RuleSetUseItem = {
//   loader: 'babel-loader',
//   options: {
//     presets: [
//       [
//         '@babel/preset-env',
//         {
//           debug: isDev,
//           modules: false,
//           targets: {
//             electron: '6.0.12',
//           },
//         },
//       ],
//     ],
//   },
// };

// export const babelLoader: RuleSetUseItem = {
//   loader: 'babel-loader',
//   options: {
//     cacheDirectory: true,
//     babelrc: false,
//     presets: [
//       [
//         '@babel/preset-env',
//         { targets: { browsers: 'last 2 versions' } }, // or whatever your project requires
//       ],
//       '@babel/preset-typescript',
//       '@babel/preset-react',
//     ],
//     plugins: [
//       // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
//       ['@babel/plugin-proposal-decorators', { legacy: true }],
//       ['@babel/plugin-proposal-class-properties', { loose: true }],
//       'react-hot-loader/babel',
//     ],
//   },
// };


export const nodeLoader: RuleSetUseItem = {
  loader: 'node-loader'
}
