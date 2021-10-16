"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotModuleReplacement = exports.miniCssExtractPlugin = exports.extractCssFiles = exports.createIndexHtml = exports.defineNodeEnvConst = exports.defineStaticDirConst = exports.cleanBuildDir = exports.tsChecker = exports.reachRefresh = exports.webpackBar = exports.nodePolyfill = void 0;
var clean_webpack_plugin_1 = require("clean-webpack-plugin");
var fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var webpack_1 = require("webpack");
var webpackbar_1 = __importDefault(require("webpackbar"));
var settings_1 = require("./settings");
var react_refresh_webpack_plugin_1 = __importDefault(require("@pmmmwh/react-refresh-webpack-plugin"));
var node_polyfill_webpack_plugin_1 = __importDefault(require("node-polyfill-webpack-plugin"));
exports.nodePolyfill = new node_polyfill_webpack_plugin_1.default();
exports.webpackBar = new webpackbar_1.default({});
exports.reachRefresh = new react_refresh_webpack_plugin_1.default();
exports.tsChecker = new fork_ts_checker_webpack_plugin_1.default({
    // silent: true
    typescript: {
        memoryLimit: 2048 * 4 //2048 is default
    }
});
exports.cleanBuildDir = new clean_webpack_plugin_1.CleanWebpackPlugin();
exports.defineStaticDirConst = new webpack_1.DefinePlugin({
    __static: JSON.stringify(settings_1.staticSourceDir),
});
exports.defineNodeEnvConst = new webpack_1.EnvironmentPlugin({ NODE_ENV: 'development' });
exports.createIndexHtml = new html_webpack_plugin_1.default({
    title: 'Webpack App',
    // template: `!!html-loader?minimize=false&url=false!${path.resolve(rendererSourceDir, 'template.html')}`,
    filename: 'index' + ".html",
    // "chunks": [entry],
    inject: 'body',
    // "compile": true,
    chunks: 'all',
    // excludeChunks: [],
    // "nodeModules": "C:\\dev\\fndebrid\\node_modules",
    meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
    },
});
/**
 * Seperates css into a seperate bundle in order to prevent brief flash of unstyled content.
 */
exports.extractCssFiles = new mini_css_extract_plugin_1.default({
    filename: '[id].styles.css',
    chunkFilename: '[id].styles.css',
    // moduleFilename: (name) => '[id].styles.css'
});
exports.miniCssExtractPlugin = mini_css_extract_plugin_1.default;
exports.hotModuleReplacement = new webpack_1.HotModuleReplacementPlugin();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2lucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWdzL3BsdWdpbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsNkRBQTBEO0FBQzFELGtHQUF3RTtBQUN4RSw0RUFBb0Q7QUFDcEQsb0ZBQTJEO0FBQzNELG1DQUErRjtBQUMvRiwwREFBb0M7QUFDcEMsdUNBQTZDO0FBQzdDLHNHQUFzRTtBQUV0RSw4RkFBOEQ7QUFFakQsUUFBQSxZQUFZLEdBQUcsSUFBSSxzQ0FBa0IsRUFBRSxDQUFDO0FBQ3hDLFFBQUEsVUFBVSxHQUFHLElBQUksb0JBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNoQyxRQUFBLFlBQVksR0FBRyxJQUFJLHNDQUFrQixFQUFFLENBQUM7QUFDeEMsUUFBQSxTQUFTLEdBQUcsSUFBSSx3Q0FBMEIsQ0FBQztJQUN0RCxlQUFlO0lBQ2YsVUFBVSxFQUFFO1FBQ1YsV0FBVyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsaUJBQWlCO0tBQ3hDO0NBQ0YsQ0FBQyxDQUFDO0FBRVUsUUFBQSxhQUFhLEdBQUcsSUFBSSx5Q0FBa0IsRUFBRSxDQUFDO0FBRXpDLFFBQUEsb0JBQW9CLEdBQUcsSUFBSSxzQkFBWSxDQUFDO0lBQ25ELFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLDBCQUFlLENBQUM7Q0FDMUMsQ0FBQyxDQUFDO0FBQ1UsUUFBQSxrQkFBa0IsR0FBRyxJQUFJLDJCQUFpQixDQUFDLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7QUFDeEUsUUFBQSxlQUFlLEdBQUcsSUFBSSw2QkFBaUIsQ0FBQztJQUNuRCxLQUFLLEVBQUUsYUFBYTtJQUNwQiwwR0FBMEc7SUFDMUcsUUFBUSxFQUFLLE9BQU8sVUFBTztJQUMzQixxQkFBcUI7SUFDckIsTUFBTSxFQUFFLE1BQU07SUFDZCxtQkFBbUI7SUFDbkIsTUFBTSxFQUFFLEtBQUs7SUFDYixxQkFBcUI7SUFDckIsb0RBQW9EO0lBQ3BELElBQUksRUFBRTtRQUNKLFFBQVEsRUFBRSx1REFBdUQ7S0FDbEU7Q0FDRixDQUFDLENBQUM7QUFFSDs7R0FFRztBQUNVLFFBQUEsZUFBZSxHQUFHLElBQUksaUNBQW9CLENBQUM7SUFDdEQsUUFBUSxFQUFFLGlCQUFpQjtJQUMzQixhQUFhLEVBQUUsaUJBQWlCO0lBQ2hDLDhDQUE4QztDQUMvQyxDQUFDLENBQUM7QUFDVSxRQUFBLG9CQUFvQixHQUFHLGlDQUFvQixDQUFDO0FBQzVDLFFBQUEsb0JBQW9CLEdBQUcsSUFBSSxvQ0FBMEIsRUFBRSxDQUFDIn0=