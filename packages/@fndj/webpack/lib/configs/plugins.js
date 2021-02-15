"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractCssFiles = exports.createIndexHtml = exports.defineNodeEnvConst = exports.defineStaticDirConst = exports.cleanBuildDir = exports.devPlugins = void 0;
var clean_webpack_plugin_1 = require("clean-webpack-plugin");
var fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var webpack_1 = require("webpack");
var webpackbar_1 = __importDefault(require("webpackbar"));
var settings_1 = require("./settings");
exports.devPlugins = [
    new webpackbar_1.default(),
    new fork_ts_checker_webpack_plugin_1.default({
    // silent: true
    })
];
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
    inject: 'head',
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2lucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWdzL3BsdWdpbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNkRBQTBEO0FBQzFELGtHQUF3RTtBQUN4RSw0RUFBb0Q7QUFDcEQsb0ZBQTJEO0FBQzNELG1DQUEwRDtBQUMxRCwwREFBb0M7QUFDcEMsdUNBQTZDO0FBRWhDLFFBQUEsVUFBVSxHQUFHO0lBQ2xCLElBQUksb0JBQVUsRUFBRTtJQUNoQixJQUFJLHdDQUEwQixDQUFDO0lBQzdCLGVBQWU7S0FDaEIsQ0FBQztDQUFDLENBQUM7QUFDQyxRQUFBLGFBQWEsR0FBSSxJQUFJLHlDQUFrQixFQUFFLENBQUM7QUFFMUMsUUFBQSxvQkFBb0IsR0FBRyxJQUFJLHNCQUFZLENBQUM7SUFDakQsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsMEJBQWUsQ0FBQztDQUMxQyxDQUFDLENBQUM7QUFDUSxRQUFBLGtCQUFrQixHQUFHLElBQUksMkJBQWlCLENBQUMsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztBQUN4RSxRQUFBLGVBQWUsR0FBRyxJQUFJLDZCQUFpQixDQUFDO0lBQ2pELEtBQUssRUFBRSxhQUFhO0lBQ3BCLDBHQUEwRztJQUMxRyxRQUFRLEVBQUssT0FBTyxVQUFPO0lBQzNCLHFCQUFxQjtJQUNyQixNQUFNLEVBQUUsTUFBTTtJQUNkLG1CQUFtQjtJQUNuQixNQUFNLEVBQUUsS0FBSztJQUNiLHFCQUFxQjtJQUNyQixvREFBb0Q7SUFDcEQsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFLHVEQUF1RDtLQUNsRTtDQUNGLENBQUMsQ0FBQztBQUNRLFFBQUEsZUFBZSxHQUFHLElBQUksaUNBQW9CLENBQUM7SUFDcEQsUUFBUSxFQUFFLGlCQUFpQjtJQUMzQixhQUFhLEVBQUUsaUJBQWlCO0NBRWpDLENBQUMsQ0FBQyJ9