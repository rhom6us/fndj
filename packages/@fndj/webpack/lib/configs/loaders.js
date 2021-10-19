"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.node_loader = exports.typescript = exports.babel = exports.experimental_ts_features_loader = exports.worker_loader = exports.worklet_loader = exports.imageLoader = exports.threadLoader = exports.sassLoader = exports.postcssLoader = exports.fontLoader = exports.fileLoader = exports.cssModuleLoader = exports.cssLoader = exports.cssHotModuleLoader = exports.cssHotLoader = exports.cssExtractLoader = void 0;
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var postcss_import_1 = __importDefault(require("postcss-import"));
var postcss_preset_env_1 = __importDefault(require("postcss-preset-env"));
var react_refresh_typescript_1 = __importDefault(require("react-refresh-typescript"));
var settings_1 = require("./settings");
function onlyif(test) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (test) {
        return args;
    }
    return [];
}
/**
 * Seperates css into a seperate bundle in order to prevent brief flash of unstyled content.
 */
exports.cssExtractLoader = mini_css_extract_plugin_1.default.loader;
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
exports.cssModuleLoader = {
    loader: 'css-loader',
    options: {
        importLoaders: 2,
        modules: true,
        import: true,
        sourceMap: settings_1.isDev,
    },
};
/** @deprecated use asset/resource */
exports.fileLoader = {
    loader: 'file-loader',
    options: {
        name: '[name]__[hash:base64:5].[ext]'
    }
};
/** @deprecated use asset/inline */
exports.fontLoader = {
    loader: 'url-loader',
    options: {
        name: 'fonts/[name]--[folder].[ext]',
        limit: 10240,
        // mimetype: 'application/font-woff'
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
exports.sassLoader = {
    loader: 'sass-loader',
    options: {
        sourceMap: settings_1.isDev,
    },
};
exports.threadLoader = {
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
exports.imageLoader = {
    loader: 'url-loader',
    options: {
        limit: 10240,
        name: 'imgs/[name]--[folder].[ext]',
    },
};
exports.worklet_loader = {
    loader: 'worklet-loader',
    options: {
        inline: false
    }
};
exports.worker_loader = {
    loader: 'worker-loader',
    options: {
        publicPath: "/scripts/workers/",
        filename: "[name].[contenthash].worker.js",
        chunkFilename: "[id].[contenthash].worker.js",
        esModule: true,
    }
};
exports.experimental_ts_features_loader = {
    loader: 'babel-loader',
    options: { plugins: [/*'react-refresh/babel', */ '@babel/plugin-syntax-top-level-await', '@babel/plugin-proposal-class-properties'] },
};
function babel() {
    var features = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        features[_i] = arguments[_i];
    }
    return {
        loader: require.resolve('babel-loader'),
        options: {
            plugins: __spreadArray(__spreadArray([], onlyif(features.includes('top_level_await'), '@babel/plugin-syntax-top-level-await'), true), onlyif(features.includes('class_properties'), '@babel/plugin-proposal-class-properties'), true)
        }
    };
}
exports.babel = babel;
function typescript() {
    var features = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        features[_i] = arguments[_i];
    }
    return {
        loader: require.resolve('ts-loader'),
        options: {
            getCustomTransformers: function () { return ({
                before: onlyif(features.includes('react_refresh'), (0, react_refresh_typescript_1.default)()),
            }); },
            transpileOnly: features.includes('transpile_only')
            // configFile: "C:\\dev\\fndebrid\\tsconfig.json"
        },
    };
}
exports.typescript = typescript;
exports.node_loader = {
    loader: 'node-loader'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWdzL2xvYWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0ZBQTJEO0FBQzNELGtFQUEyQztBQUMzQywwRUFBa0Q7QUFDbEQsc0ZBQThEO0FBRTlELHVDQUFtQztBQUVuQyxTQUFTLE1BQU0sQ0FBa0IsSUFBYTtJQUFFLGNBQVU7U0FBVixVQUFVLEVBQVYscUJBQVUsRUFBVixJQUFVO1FBQVYsNkJBQVU7O0lBQ3hELElBQUksSUFBSSxFQUFFO1FBQ1IsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELE9BQU8sRUFBRSxDQUFDO0FBQ1osQ0FBQztBQUlEOztHQUVHO0FBQ1UsUUFBQSxnQkFBZ0IsR0FBbUIsaUNBQW9CLENBQUMsTUFBTSxDQUFDO0FBQy9ELFFBQUEsWUFBWSxHQUFtQjtJQUMxQyxNQUFNLEVBQUUsZ0JBQWdCO0NBQ3pCLENBQUM7QUFDVyxRQUFBLGtCQUFrQixHQUFtQjtJQUNoRCxNQUFNLEVBQUUsZ0JBQWdCO0lBQ3hCLE9BQU8sRUFBRTtRQUNQLFNBQVMsRUFBRSxJQUFJO0tBQ2hCO0NBQ0YsQ0FBQztBQUNXLFFBQUEsU0FBUyxHQUFtQjtJQUN2QyxNQUFNLEVBQUUsWUFBWTtJQUNwQixPQUFPLEVBQUU7UUFDUCxhQUFhLEVBQUUsQ0FBQztRQUNoQixPQUFPLEVBQUUsS0FBSztRQUNkLFNBQVMsRUFBRSxnQkFBSztLQUNqQjtDQUNGLENBQUM7QUFDVyxRQUFBLGVBQWUsR0FBbUI7SUFDN0MsTUFBTSxFQUFFLFlBQVk7SUFDcEIsT0FBTyxFQUFFO1FBQ1AsYUFBYSxFQUFFLENBQUM7UUFDaEIsT0FBTyxFQUFFLElBQUk7UUFDYixNQUFNLEVBQUUsSUFBSTtRQUNaLFNBQVMsRUFBRSxnQkFBSztLQUNqQjtDQUNGLENBQUM7QUFFRixxQ0FBcUM7QUFDeEIsUUFBQSxVQUFVLEdBQW1CO0lBQ3hDLE1BQU0sRUFB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