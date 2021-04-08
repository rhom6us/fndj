"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotModuleReplacement = exports.miniCssExtractPlugin = exports.extractCssFiles = exports.createIndexHtml = exports.defineNodeEnvConst = exports.defineStaticDirConst = exports.cleanBuildDir = exports.tsChecker = exports.reachRefresh = exports.webpackBar = void 0;
var clean_webpack_plugin_1 = require("clean-webpack-plugin");
var fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var webpack_1 = require("webpack");
var webpackbar_1 = __importDefault(require("webpackbar"));
var settings_1 = require("./settings");
var react_refresh_webpack_plugin_1 = __importDefault(require("@pmmmwh/react-refresh-webpack-plugin"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2lucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWdzL3BsdWdpbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsNkRBQTBEO0FBQzFELGtHQUF3RTtBQUN4RSw0RUFBb0Q7QUFDcEQsb0ZBQTJEO0FBQzNELG1DQUErRjtBQUMvRiwwREFBb0M7QUFDcEMsdUNBQTZDO0FBQzdDLHNHQUFzRTtBQUd6RCxRQUFBLFVBQVUsR0FBRyxJQUFJLG9CQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDaEMsUUFBQSxZQUFZLEdBQUcsSUFBSSxzQ0FBa0IsRUFBRSxDQUFDO0FBQ3hDLFFBQUEsU0FBUyxHQUFHLElBQUksd0NBQTBCLENBQUM7QUFDdEQsZUFBZTtDQUNoQixDQUFDLENBQUM7QUFFVSxRQUFBLGFBQWEsR0FBRyxJQUFJLHlDQUFrQixFQUFFLENBQUM7QUFFekMsUUFBQSxvQkFBb0IsR0FBRyxJQUFJLHNCQUFZLENBQUM7SUFDbkQsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsMEJBQWUsQ0FBQztDQUMxQyxDQUFDLENBQUM7QUFDVSxRQUFBLGtCQUFrQixHQUFHLElBQUksMkJBQWlCLENBQUMsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztBQUN4RSxRQUFBLGVBQWUsR0FBRyxJQUFJLDZCQUFpQixDQUFDO0lBQ25ELEtBQUssRUFBRSxhQUFhO0lBQ3BCLDBHQUEwRztJQUMxRyxRQUFRLEVBQUssT0FBTyxVQUFPO0lBQzNCLHFCQUFxQjtJQUNyQixNQUFNLEVBQUUsTUFBTTtJQUNkLG1CQUFtQjtJQUNuQixNQUFNLEVBQUUsS0FBSztJQUNiLHFCQUFxQjtJQUNyQixvREFBb0Q7SUFDcEQsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFLHVEQUF1RDtLQUNsRTtDQUNGLENBQUMsQ0FBQztBQUNVLFFBQUEsZUFBZSxHQUFHLElBQUksaUNBQW9CLENBQUM7SUFDdEQsUUFBUSxFQUFFLGlCQUFpQjtJQUMzQixhQUFhLEVBQUUsaUJBQWlCO0lBQ2hDLDhDQUE4QztDQUMvQyxDQUFDLENBQUM7QUFDVSxRQUFBLG9CQUFvQixHQUFHLGlDQUFvQixDQUFDO0FBQzVDLFFBQUEsb0JBQW9CLEdBQUcsSUFBSSxvQ0FBMEIsRUFBRSxDQUFDIn0=