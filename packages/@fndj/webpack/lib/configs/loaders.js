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
exports.node_loader = exports.ts_loader = exports.babel_loader = exports.worker_loader = exports.worklet_loader = exports.threadLoader = exports.sassLoader = exports.postcssLoader = exports.css_loader = exports.css_hot_loader = exports.css_extract_loader = exports.onlyif = void 0;
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
exports.onlyif = onlyif;
/**
 * Seperates css into a seperate bundle in order to prevent brief flash of unstyled content.
 */
exports.css_extract_loader = mini_css_extract_plugin_1.default.loader;
// export function css_extract_loader(options?: MiniCssExtractPlugin.LoaderOptions) {
//   return {
//     loader: MiniCssExtractPlugin.loader,
//     options
//   };
// }
function css_hot_loader(options) {
    return {
        loader: require.resolve('css-hot-loader'),
        options: options
    };
}
exports.css_hot_loader = css_hot_loader;
function css_loader(options) {
    return {
        loader: require.resolve('css-loader'),
        options: options
    };
}
exports.css_loader = css_loader;
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
exports.worklet_loader = {
    loader: 'worklet-loader',
    options: {
        inline: true,
        // publicPath: "/scripts/worklets/",
    }
};
exports.worker_loader = {
    loader: 'worker-loader',
    options: {
        publicPath: "/scripts/workers/",
        // filename: "[name].[contenthash].worker.js",
        // chunkFilename: "[id].[contenthash].worker.js",
        esModule: true,
    }
};
function babel_loader() {
    var features = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        features[_i] = arguments[_i];
    }
    return {
        loader: require.resolve('babel-loader'),
        options: {
            plugins: __spreadArray(__spreadArray(__spreadArray(__spreadArray([], onlyif(features.includes('top_level_await'), '@babel/plugin-syntax-top-level-await'), true), onlyif(features.includes('class_properties'), '@babel/plugin-proposal-class-properties'), true), onlyif(features.includes('jsx_self'), '@babel/plugin-transform-react-jsx-self'), true), onlyif(features.includes('jsx_source'), '@babel/plugin-transform-react-jsx-source'), true)
        }
    };
}
exports.babel_loader = babel_loader;
function ts_loader() {
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
exports.ts_loader = ts_loader;
exports.node_loader = {
    loader: 'node-loader'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWdzL2xvYWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0ZBQTJEO0FBQzNELGtFQUEyQztBQUMzQywwRUFBa0Q7QUFDbEQsc0ZBQThEO0FBRTlELHVDQUFtQztBQUVuQyxTQUFnQixNQUFNLENBQWtCLElBQWE7SUFBRSxjQUFVO1NBQVYsVUFBVSxFQUFWLHFCQUFVLEVBQVYsSUFBVTtRQUFWLDZCQUFVOztJQUMvRCxJQUFJLElBQUksRUFBRTtRQUNSLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFDRCxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUM7QUFMRCx3QkFLQztBQUlEOztHQUVHO0FBQ1UsUUFBQSxrQkFBa0IsR0FBRyxpQ0FBb0IsQ0FBQyxNQUFNLENBQUM7QUFDOUQscUZBQXFGO0FBQ3JGLGFBQWE7QUFDYiwyQ0FBMkM7QUFDM0MsY0FBYztBQUNkLE9BQU87QUFDUCxJQUFJO0FBQ0osU0FBZ0IsY0FBYyxDQUFDLE9BQWlDO0lBQzlELE9BQU87UUFDTCxNQUFNLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztRQUN6QyxPQUFPLFNBQUE7S0FDUixDQUFDO0FBQ0osQ0FBQztBQUxELHdDQUtDO0FBNkRELFNBQWdCLFVBQVUsQ0FBQyxPQUEwQjtJQUNuRCxPQUFPO1FBQ0wsTUFBTSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQ3JDLE9BQU8sU0FBQTtLQUNSLENBQUM7QUFDSixDQUFDO0FBTEQsZ0NBS0M7QUFDWSxRQUFBLGFBQWEsR0FBbUI7SUFDM0MsTUFBTSxFQUFFLGdCQUFnQjtJQUN4QixPQUFPLEVBQUU7UUFDUCxTQUFTLEVBQUUsZ0JBQUs7UUFDaEIsY0FBYyxFQUFFO1lBQ2QsT0FBTyxFQUFFLENBQUMsSUFBQSx3QkFBYSxHQUFFLEVBQUUsSUFBQSw0QkFBZ0IsR0FBRSxDQUFDO1NBQy9DO0tBQ0Y7Q0FDRixDQUFDO0FBQ1csUUFBQSxVQUFVLEdBQW1CO0lBQ3hDLE1BQU0sRUFBRSxhQUFhO0lBQ3JCLE9BQU8sRUFBRTtRQUNQLFNBQVMsRUFBRSxnQkFBSztLQUNqQjtDQUNGLENBQUM7QUFDVyxRQUFBLFlBQVksR0FBbUI7SUFDMUMsTUFBTSxFQUFFLGVBQWU7Q0FDeEIsQ0FBQztBQUVXLFFBQUEsY0FBYyxHQUFtQjtJQUM1QyxNQUFNLEVBQUUsZ0JBQWdCO0lBQ3hCLE9BQU8sRUFBRTtRQUNQLE1BQU0sRUFBRSxJQUFJO1FBQ1osb0NBQW9DO0tBQ3JDO0NBQ0YsQ0FBQztBQUVXLFFBQUEsYUFBYSxHQUFtQjtJQUMzQyxNQUFNLEVBQUUsZUFBZTtJQUN2QixPQUFPLEVBQUU7UUFDUCxVQUFVLEVBQUUsbUJBQW1CO1FBQy9CLDhDQUE4QztRQUM5QyxpREFBaUQ7UUFDakQsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUM7QUFFRixTQUFnQixZQUFZO0lBQUMsa0JBQXNGO1NBQXRGLFVBQXNGLEVBQXRGLHFCQUFzRixFQUF0RixJQUFzRjtRQUF0Riw2QkFBc0Y7O0lBQ2pILE9BQU87UUFDTCxNQUFNLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7UUFDdkMsT0FBTyxFQUFFO1lBQ1AsT0FBTyw4REFDRixNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLHNDQUFzQyxDQUFDLFNBQ3BGLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEVBQUUseUNBQXlDLENBQUMsU0FDeEYsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUUsd0NBQXdDLENBQUMsU0FDL0UsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsMENBQTBDLENBQUMsT0FDdkY7U0FDRjtLQUNGLENBQUM7QUFDSixDQUFDO0FBWkQsb0NBWUM7QUFDRCxTQUFnQixTQUFTO0lBQUMsa0JBQXNEO1NBQXRELFVBQXNELEVBQXRELHFCQUFzRCxFQUF0RCxJQUFzRDtRQUF0RCw2QkFBc0Q7O0lBQzlFLE9BQU87UUFDTCxNQUFNLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDcEMsT0FBTyxFQUFFO1lBQ1AscUJBQXFCLEVBQUUsY0FBTSxPQUFBLENBQUM7Z0JBQzVCLE1BQU0sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRSxJQUFBLGtDQUFzQixHQUFFLENBQUM7YUFDN0UsQ0FBQyxFQUYyQixDQUUzQjtZQUNGLGFBQWEsRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDO1lBQ2xELGlEQUFpRDtTQUNsRDtLQUNGLENBQUM7QUFDSixDQUFDO0FBWEQsOEJBV0M7QUFFWSxRQUFBLFdBQVcsR0FBbUI7SUFDekMsTUFBTSxFQUFFLGFBQWE7Q0FDdEIsQ0FBQyJ9