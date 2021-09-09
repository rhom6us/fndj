"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeLoader = exports.tsLoader = exports.reactRefreshLoader = exports.workerLoader = exports.workletLoader = exports.imageLoader = exports.fontLoader = exports.electronMainBabelLoader = exports.threadLoader = exports.fileLoader = exports.postcssLoader = exports.sassLoader = exports.cssLoader = exports.cssHotModuleLoader = exports.cssHotLoader = exports.cssModuleLoader = void 0;
var postcss_import_1 = __importDefault(require("postcss-import"));
var postcss_preset_env_1 = __importDefault(require("postcss-preset-env"));
var settings_1 = require("./settings");
exports.cssModuleLoader = {
    loader: 'css-loader',
    options: {
        importLoaders: 2,
        modules: true,
        import: true,
        sourceMap: settings_1.isDev,
    },
};
exports.cssHotLoader = {
    loader: 'css-hot-loader',
};
exports.cssHotModuleLoader = {
    loader: 'css-hot-loader',
    options: {
        cssModule: true,
    },
};
exports.cssLoader = {
    loader: 'css-loader',
    options: {
        importLoaders: 2,
        modules: false,
        sourceMap: settings_1.isDev,
    },
};
exports.sassLoader = {
    loader: 'sass-loader',
    options: {
        sourceMap: settings_1.isDev,
    },
};
exports.postcssLoader = {
    loader: 'postcss-loader',
    options: {
        sourceMap: settings_1.isDev,
        postcssOptions: {
            plugins: [(0, postcss_import_1.default)(), (0, postcss_preset_env_1.default)()]
        },
    },
};
exports.fileLoader = {
    loader: 'file-loader?name=[name]__[hash:base64:5].[ext]',
};
exports.threadLoader = {
    loader: 'thread-loader',
};
exports.electronMainBabelLoader = {
    loader: 'babel-loader',
    options: {
        presets: [
            [
                '@babel/preset-env',
                {
                    debug: settings_1.isDev,
                    modules: false,
                    targets: {
                        electron: '6.0.12',
                    },
                },
            ],
        ],
    },
};
exports.fontLoader = {
    loader: 'url-loader',
    options: {
        name: 'fonts/[name]--[folder].[ext]',
        limit: 10240,
        // mimetype: 'application/font-woff'
    },
};
// export const wasmLoader: RuleSetUseItem = {
//   loader: 'url-loader',
//   options: {
//     limit: 10240,
//     name: 'imgs/[name]--[folder].[ext]',
//   },
// };
exports.imageLoader = {
    loader: 'url-loader',
    options: {
        limit: 10240,
        name: 'imgs/[name]--[folder].[ext]',
    },
};
exports.workletLoader = {
    loader: 'worklet-loader',
    options: {
        name: 'js/[hash].worklet.js'
    }
};
exports.workerLoader = {
    loader: 'worker-loader',
    options: {
        publicPath: "/scripts/workers/",
        filename: "[name].[contenthash].worker.js",
        chunkFilename: "[id].[contenthash].worker.js",
        esModule: true,
    }
};
exports.reactRefreshLoader = {
    loader: 'babel-loader',
    options: { plugins: ['react-refresh/babel', '@babel/plugin-syntax-top-level-await', '@babel/plugin-proposal-class-properties'] },
};
exports.tsLoader = {
    loader: 'ts-loader',
    options: {
        transpileOnly: settings_1.isDev,
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
exports.nodeLoader = {
    loader: 'node-loader'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWdzL2xvYWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0VBQTJDO0FBQzNDLDBFQUFrRDtBQUVsRCx1Q0FBbUM7QUFDdEIsUUFBQSxlQUFlLEdBQW1CO0lBQzdDLE1BQU0sRUFBRSxZQUFZO0lBQ3BCLE9BQU8sRUFBRTtRQUNQLGFBQWEsRUFBRSxDQUFDO1FBQ2hCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsTUFBTSxFQUFFLElBQUk7UUFDWixTQUFTLEVBQUUsZ0JBQUs7S0FDakI7Q0FDRixDQUFDO0FBQ1csUUFBQSxZQUFZLEdBQW1CO0lBQzFDLE1BQU0sRUFBRSxnQkFBZ0I7Q0FDekIsQ0FBQztBQUNXLFFBQUEsa0JBQWtCLEdBQW1CO0lBQ2hELE1BQU0sRUFBRSxnQkFBZ0I7SUFDeEIsT0FBTyxFQUFFO1FBQ1AsU0FBUyxFQUFFLElBQUk7S0FDaEI7Q0FDRixDQUFDO0FBQ1csUUFBQSxTQUFTLEdBQW1CO0lBQ3ZDLE1BQU0sRUFBRSxZQUFZO0lBQ3BCLE9BQU8sRUFBRTtRQUNQLGFBQWEsRUFBRSxDQUFDO1FBQ2hCLE9BQU8sRUFBRSxLQUFLO1FBQ2QsU0FBUyxFQUFFLGdCQUFLO0tBQ2pCO0NBQ0YsQ0FBQztBQUNXLFFBQUEsVUFBVSxHQUFtQjtJQUN4QyxNQUFNLEVBQUUsYUFBYTtJQUNyQixPQUFPLEVBQUU7UUFDUCxTQUFTLEVBQUUsZ0JBQUs7S0FDakI7Q0FDRixDQUFDO0FBQ1csUUFBQSxhQUFhLEdBQW1CO0lBQzNDLE1BQU0sRUFBRSxnQkFBZ0I7SUFDeEIsT0FBTyxFQUFFO1FBQ1AsU0FBUyxFQUFFLGdCQUFLO1FBQ2hCLGNBQWMsRUFBRTtZQUNkLE9BQU8sRUFBRSxDQUFDLElBQUEsd0JBQWEsR0FBRSxFQUFFLElBQUEsNEJBQWdCLEdBQUUsQ0FBQztTQUMvQztLQUNGO0NBQ0YsQ0FBQztBQUNXLFFBQUEsVUFBVSxHQUFt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