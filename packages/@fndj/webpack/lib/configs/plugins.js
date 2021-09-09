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
exports.extractCssFiles = new mini_css_extract_plugin_1.default({
    filename: '[id].styles.css',
    chunkFilename: '[id].styles.css',
    // moduleFilename: (name) => '[id].styles.css'
});
exports.miniCssExtractPlugin = mini_css_extract_plugin_1.default;
exports.hotModuleReplacement = new webpack_1.HotModuleReplacementPlugin();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2lucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWdzL3BsdWdpbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsNkRBQTBEO0FBQzFELGtHQUF3RTtBQUN4RSw0RUFBb0Q7QUFDcEQsb0ZBQTJEO0FBQzNELG1DQUErRjtBQUMvRiwwREFBb0M7QUFDcEMsdUNBQTZDO0FBQzdDLHNHQUFzRTtBQUV0RSw4RkFBOEQ7QUFFakQsUUFBQSxZQUFZLEdBQUcsSUFBSSxzQ0FBa0IsRUFBRSxDQUFDO0FBQ3hDLFFBQUEsVUFBVSxHQUFHLElBQUksb0JBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNoQyxRQUFBLFlBQVksR0FBRyxJQUFJLHNDQUFrQixFQUFFLENBQUM7QUFDeEMsUUFBQSxTQUFTLEdBQUcsSUFBSSx3Q0FBMEIsQ0FBQztBQUN0RCxlQUFlO0NBQ2hCLENBQUMsQ0FBQztBQUVVLFFBQUEsYUFBYSxHQUFHLElBQUkseUNBQWtCLEVBQUUsQ0FBQztBQUV6QyxRQUFBLG9CQUFvQixHQUFHLElBQUksc0JBQVksQ0FBQztJQUNuRCxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQywwQkFBZSxDQUFDO0NBQzFDLENBQUMsQ0FBQztBQUNVLFFBQUEsa0JBQWtCLEdBQUcsSUFBSSwyQkFBaUIsQ0FBQyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO0FBQ3hFLFFBQUEsZUFBZSxHQUFHLElBQUksNkJBQWlCLENBQUM7SUFDbkQsS0FBSyxFQUFFLGFBQWE7SUFDcEIsMEdBQTBHO0lBQzFHLFFBQVEsRUFBSyxPQUFPLFVBQU87SUFDM0IscUJBQXFCO0lBQ3JCLE1BQU0sRUFBRSxNQUFNO0lBQ2QsbUJBQW1CO0lBQ25CLE1BQU0sRUFBRSxLQUFLO0lBQ2IscUJBQXFCO0lBQ3JCLG9EQUFvRDtJQUNwRCxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUUsdURBQXVEO0tBQ2xFO0NBQ0YsQ0FBQyxDQUFDO0FBQ1UsUUFBQSxlQUFlLEdBQUcsSUFBSSxpQ0FBb0IsQ0FBQztJQUN0RCxRQUFRLEVBQUUsaUJBQWlCO0lBQzNCLGFBQWEsRUFBRSxpQkFBaUI7SUFDaEMsOENBQThDO0NBQy9DLENBQUMsQ0FBQztBQUNVLFFBQUEsb0JBQW9CLEdBQUcsaUNBQW9CLENBQUM7QUFDNUMsUUFBQSxvQkFBb0IsR0FBRyxJQUFJLG9DQUEwQixFQUFFLENBQUMifQ==