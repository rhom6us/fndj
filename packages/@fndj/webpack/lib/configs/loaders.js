"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeLoader = exports.tsLoader = exports.reactRefreshLoader = exports.workerLoader = exports.workletLoader = exports.imageLoader = exports.threadLoader = exports.sassLoader = exports.postcssLoader = exports.fontLoader = exports.fileLoader = exports.cssModuleLoader = exports.cssLoader = exports.cssHotModuleLoader = exports.cssHotLoader = exports.cssExtractLoader = void 0;
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var postcss_import_1 = __importDefault(require("postcss-import"));
var postcss_preset_env_1 = __importDefault(require("postcss-preset-env"));
var settings_1 = require("./settings");
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
/** @deprecated  */
exports.fileLoader = {
    loader: 'file-loader',
    options: {
        name: '[name]__[hash:base64:5].[ext]'
    }
};
/** @deprecated  */
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
/** @deprecated  */
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
        inline: false
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
        transpileOnly: settings_1.isDev
        // projectReferences: true,
        // appendTsSuffixTo: [{}],
        // configFile: "C:\\dev\\fndebrid\\tsconfig.json"
    },
};
exports.nodeLoader = {
    loader: 'node-loader'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWdzL2xvYWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0Esb0ZBQTJEO0FBRTNELGtFQUEyQztBQUMzQywwRUFBa0Q7QUFFbEQsdUNBQTBEO0FBSzFEOztHQUVHO0FBQ1UsUUFBQSxnQkFBZ0IsR0FBbUIsaUNBQW9CLENBQUMsTUFBTSxDQUFDO0FBQy9ELFFBQUEsWUFBWSxHQUFtQjtJQUMxQyxNQUFNLEVBQUUsZ0JBQWdCO0NBQ3pCLENBQUM7QUFDVyxRQUFBLGtCQUFrQixHQUFtQjtJQUNoRCxNQUFNLEVBQUUsZ0JBQWdCO0lBQ3hCLE9BQU8sRUFBRTtRQUNQLFNBQVMsRUFBRSxJQUFJO0tBQ2hCO0NBQ0YsQ0FBQztBQUNXLFFBQUEsU0FBUyxHQUFtQjtJQUN2QyxNQUFNLEVBQUUsWUFBWTtJQUNwQixPQUFPLEVBQUU7UUFDUCxhQUFhLEVBQUUsQ0FBQztRQUNoQixPQUFPLEVBQUUsS0FBSztRQUNkLFNBQVMsRUFBRSxnQkFBSztLQUNqQjtDQUNGLENBQUM7QUFDVyxRQUFBLGVBQWUsR0FBbUI7SUFDN0MsTUFBTSxFQUFFLFlBQVk7SUFDcEIsT0FBTyxFQUFFO1FBQ1AsYUFBYSxFQUFFLENBQUM7UUFDaEIsT0FBTyxFQUFFLElBQUk7UUFDYixNQUFNLEVBQUUsSUFBSTtRQUNaLFNBQVMsRUFBRSxnQkFBSztLQUNqQjtDQUNGLENBQUM7QUFFRixtQkFBbUI7QUFDTixRQUFBLFVBQVUsR0FBbUI7SUFDeEMsTUFBTSxFQUFFLGFBQWE7SUFDckIsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLCtCQUErQjtLQUN0QztDQUNGLENBQUM7QUFDRixtQkFBbUI7QUFDTixRQUFBLFVBQVUsR0FBbUI7SUFDeEMsTUFBTSxFQUFFLFlBQVk7SUFDcEIsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLDhCQUE4QjtRQUNwQyxLQUFLLEVBQUUsS0FBSztRQUNaLG9DQUFvQztLQUNyQztDQUNGLENBQUM7QUFDVyxRQUFBLGFBQWEsR0FBbUI7SUFDM0MsTUFBTSxFQUFFLGdCQUFnQjtJQUN4QixPQUFPLEVBQUU7UUFDUCxTQUFTLEVBQUUsZ0JBQUs7UUFDaEIsY0FBYyxFQUFFO1lBQ2QsT0FBTyxFQUFFLENBQUMsSUFBQSx3QkFBYSxHQUFFLEVBQUUsSUFBQSw0QkFBZ0IsR0FBRSxDQUFDO1NBQy9DO0tBQ0Y7Q0FDRixDQUFDO0FBQ1csUUFBQSxVQUFVLEdBQW1CO0lBQ3hDLE1BQU0sRUFBRSxhQUFhO0lBQ3JCLE9BQU8sRUFBRTtRQUNQLFNBQVMsRUFBRSxnQkFBSztLQUNqQjtDQUNGLENBQUM7QUFDVyxRQUFBLFlBQVksR0FBbUI7SUFDMUMsTUFBTSxFQUFFLGVBQWU7Q0FDeEIsQ0FBQztBQUNGLDhDQUE4QztBQUM5QywwQkFBMEI7QUFDMUIsZUFBZTtBQUNmLG9CQUFvQjtBQUNwQiwyQ0FBMkM7QUFDM0MsT0FBTztBQUNQLEtBQUs7QUFDTCxtQkFBbUI7QUFDTixRQUFBLFdBQVcsR0FBbUI7SUFDekMsTUFBTSxFQUFFLFlBQVk7SUFDcEIsT0FBTyxFQUFFO1FBQ1AsS0FBSyxFQUFFLEtBQUs7UUFDWixJQUFJLEVBQUUsNkJBQTZCO0tBQ3BDO0NBQ0YsQ0FBQztBQUNXLFFBQUEsYUFBYSxHQUFtQjtJQUMzQyxNQUFNLEVBQUUsZ0JBQWdCO0lBQ3hCLE9BQU8sRUFBRTtRQUNQLE1BQU0sRUFBRSxLQUFLO0tBQ2Q7Q0FDRixDQUFDO0FBRVcsUUFBQSxZQUFZLEdBQW1CO0lBQzFDLE1BQU0sRUFBRSxlQUFlO0lBQ3ZCLE9BQU8sRUFBRTtRQUNQLFVBQVUsRUFBRSxtQkFBbUI7UUFDL0IsUUFBUSxFQUFFLGdDQUFnQztRQUMxQyxhQUFhLEVBQUUsOEJBQThCO1FBQzdDLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7Q0FDRixDQUFDO0FBQ1csUUFBQSxrQkFBa0IsR0FBbUI7SUFDaEQsTUFBTSxFQUFFLGNBQWM7SUFDdEIsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMscUJBQXFCLEVBQUUsc0NBQXNDLEVBQUUseUNBQXlDLENBQUMsRUFBRTtDQUNqSSxDQUFDO0FBQ1csUUFBQSxRQUFRLEdBQW1CO0lBQ3RDLE1BQU0sRUFBRSxXQUFXO0lBQ25CLE9BQU8sRUFBRTtRQUNQLGFBQWEsRUFBRSxnQkFBSztRQUVwQiwyQkFBMkI7UUFDM0IsMEJBQTBCO1FBQzFCLGlEQUFpRDtLQUNsRDtDQUNGLENBQUM7QUFHVyxRQUFBLFVBQVUsR0FBbUI7SUFDeEMsTUFBTSxFQUFFLGFBQWE7Q0FDdEIsQ0FBQyJ9