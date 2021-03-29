"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeLoader = exports.workletLoader = exports.babelLoader = exports.jsLoader = exports.workerLoader = exports.tsLoader = exports.imageLoader = exports.fontLoader = exports.electronMainBabelLoader = exports.threadLoader = exports.fileLoader = exports.postcssLoader = exports.sassLoader = exports.cssLoader = exports.cssHotModuleLoader = exports.cssHotLoader = exports.cssModuleLoader = void 0;
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
            plugins: [postcss_import_1.default(), postcss_preset_env_1.default()]
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
exports.imageLoader = {
    loader: 'url-loader',
    options: {
        limit: 10240,
        name: 'imgs/[name]--[folder].[ext]',
    },
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
exports.workerLoader = {
    loader: 'worker-loader',
    options: {
        publicPath: "/scripts/workers/",
        filename: "[name].[contenthash].worker.js",
        chunkFilename: "[id].[contenthash].worker.js",
        esModule: true,
    }
};
exports.jsLoader = {
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
exports.babelLoader = {
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
exports.workletLoader = {
    loader: 'worklet-loader',
    options: {
        name: 'js/[hash].worklet.js'
    }
};
exports.nodeLoader = {
    loader: 'node-loader'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWdzL2xvYWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0VBQTJDO0FBQzNDLDBFQUFrRDtBQUVsRCx1Q0FBbUM7QUFDdEIsUUFBQSxlQUFlLEdBQW1CO0lBQzdDLE1BQU0sRUFBRSxZQUFZO0lBQ3BCLE9BQU8sRUFBRTtRQUNQLGFBQWEsRUFBRSxDQUFDO1FBQ2hCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsTUFBTSxFQUFFLElBQUk7UUFDWixTQUFTLEVBQUUsZ0JBQUs7S0FDakI7Q0FDRixDQUFDO0FBQ1csUUFBQSxZQUFZLEdBQW1CO0lBQzFDLE1BQU0sRUFBRSxnQkFBZ0I7Q0FDekIsQ0FBQztBQUNXLFFBQUEsa0JBQWtCLEdBQW1CO0lBQ2hELE1BQU0sRUFBRSxnQkFBZ0I7SUFDeEIsT0FBTyxFQUFFO1FBQ1AsU0FBUyxFQUFFLElBQUk7S0FDaEI7Q0FDRixDQUFDO0FBQ1csUUFBQSxTQUFTLEdBQW1CO0lBQ3ZDLE1BQU0sRUFBRSxZQUFZO0lBQ3BCLE9BQU8sRUFBRTtRQUNQLGFBQWEsRUFBRSxDQUFDO1FBQ2hCLE9BQU8sRUFBRSxLQUFLO1FBQ2QsU0FBUyxFQUFFLGdCQUFLO0tBQ2pCO0NBQ0YsQ0FBQztBQUNXLFFBQUEsVUFBVSxHQUFtQjtJQUN4QyxNQUFNLEVBQUUsYUFBYTtJQUNyQixPQUFPLEVBQUU7UUFDUCxTQUFTLEVBQUUsZ0JBQUs7S0FDakI7Q0FDRixDQUFDO0FBQ1csUUFBQSxhQUFhLEdBQW1CO0lBQzNDLE1BQU0sRUFBRSxnQkFBZ0I7SUFDeEIsT0FBTyxFQUFFO1FBQ1AsU0FBUyxFQUFFLGdCQUFLO1FBQ2hCLGNBQWMsRUFBRTtZQUNkLE9BQU8sRUFBRSxDQUFDLHdCQUFhLEVBQUUsRUFBRSw0QkFBZ0IsRUFBRSxDQUFDO1NBQy9DO0tBQ0Y7Q0FDRixDQUFDO0FBQ1csUUFBQSxVQUFVLEdBQW1CO0lBQ3hDLE1B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