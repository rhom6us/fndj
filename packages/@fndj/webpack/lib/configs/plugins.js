"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotModuleReplacement = exports.miniCssExtractPlugin = exports.extractCssFiles = exports.createIndexHtml = exports.defineNodeEnvConst = exports.defineStaticDirConst = exports.cleanBuildDir = exports.tsCheckerNotifier = exports.tsChecker = exports.reachRefresh = exports.webpackBar = exports.nodePolyfill = void 0;
var react_refresh_webpack_plugin_1 = __importDefault(require("@pmmmwh/react-refresh-webpack-plugin"));
var clean_webpack_plugin_1 = require("clean-webpack-plugin");
var fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var node_polyfill_webpack_plugin_1 = __importDefault(require("node-polyfill-webpack-plugin"));
var path_1 = __importDefault(require("path"));
var webpack_1 = require("webpack");
var webpackbar_1 = __importDefault(require("webpackbar"));
var settings_1 = require("./settings");
var fork_ts_checker_notifier_webpack_plugin_1 = __importDefault(require("fork-ts-checker-notifier-webpack-plugin"));
exports.nodePolyfill = new node_polyfill_webpack_plugin_1.default();
exports.webpackBar = new webpackbar_1.default({});
exports.reachRefresh = new react_refresh_webpack_plugin_1.default({
    forceEnable: true,
    esModule: true
});
exports.tsChecker = new fork_ts_checker_webpack_plugin_1.default({
    // silent: true
    formatter: 'basic',
    typescript: {
        memoryLimit: 2048 * 4 //2048 is default
    }
});
exports.tsCheckerNotifier = new fork_ts_checker_notifier_webpack_plugin_1.default({
    excludeWarnings: true,
    skipSuccessful: false,
    skipFirstNotification: false,
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
    // chunks: 'all',
    // excludeChunks: [],
    // "nodeModules": "C:\\dev\\fndebrid\\node_modules",
    meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
    },
    template: path_1.default.join(settings_1.projectDir, 'public/index.html')
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2lucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWdzL3BsdWdpbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0Esc0dBQXNFO0FBQ3RFLDZEQUEwRDtBQUMxRCxrR0FBd0U7QUFDeEUsNEVBQW9EO0FBQ3BELG9GQUEyRDtBQUMzRCw4RkFBOEQ7QUFDOUQsOENBQXdCO0FBQ3hCLG1DQUFzRjtBQUN0RiwwREFBb0M7QUFDcEMsdUNBQXlEO0FBQ3pELG9IQUF5RjtBQUU1RSxRQUFBLFlBQVksR0FBRyxJQUFJLHNDQUFrQixFQUFFLENBQUM7QUFDeEMsUUFBQSxVQUFVLEdBQUcsSUFBSSxvQkFBVSxDQUFDLEVBRXhDLENBQUMsQ0FBQztBQUNVLFFBQUEsWUFBWSxHQUFHLElBQUksc0NBQWtCLENBQUM7SUFDakQsV0FBVyxFQUFFLElBQUk7SUFDakIsUUFBUSxFQUFFLElBQUk7Q0FDZixDQUFDLENBQUM7QUFDVSxRQUFBLFNBQVMsR0FBRyxJQUFJLHdDQUEwQixDQUFDO0lBQ3RELGVBQWU7SUFFZixTQUFTLEVBQUUsT0FBTztJQUNsQixVQUFVLEVBQUU7UUFDVixXQUFXLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxpQkFBaUI7S0FDeEM7Q0FDRixDQUFDLENBQUM7QUFDVSxRQUFBLGlCQUFpQixHQUFHLElBQUksaURBQWtDLENBQUM7SUFDdEUsZUFBZSxFQUFFLElBQUk7SUFDckIsY0FBYyxFQUFFLEtBQUs7SUFDckIscUJBQXFCLEVBQUUsS0FBSztDQUM3QixDQUFDLENBQUM7QUFDVSxRQUFBLGFBQWEsR0FBRyxJQUFJLHlDQUFrQixFQUFFLENBQUM7QUFFekMsUUFBQSxvQkFBb0IsR0FBRyxJQUFJLHNCQUFZLENBQUM7SUFDbkQsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsMEJBQWUsQ0FBQztDQUMxQyxDQUFDLENBQUM7QUFDVSxRQUFBLGtCQUFrQixHQUFHLElBQUksMkJBQWlCLENBQUMsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztBQUN4RSxRQUFBLGVBQWUsR0FBRyxJQUFJLDZCQUFpQixDQUFDO0lBQ25ELEtBQUssRUFBRSxhQUFhO0lBQ3BCLDBHQUEwRztJQUMxRyxRQUFRLEVBQUssT0FBTyxVQUFPO0lBQzNCLHFCQUFxQjtJQUNyQixNQUFNLEVBQUUsTUFBTTtJQUNkLG1CQUFtQjtJQUNuQixpQkFBaUI7SUFDakIscUJBQXFCO0lBQ3JCLG9EQUFvRDtJQUNwRCxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUUsdURBQXVEO0tBQ2xFO0lBQ0QsUUFBUSxFQUFFLGNBQUksQ0FBQyxJQUFJLENBQUMscUJBQVUsRUFBRSxtQkFBbUIsQ0FBQztDQUNyRCxDQUFDLENBQUM7QUFFSDs7R0FFRztBQUNVLFFBQUEsZUFBZSxHQUFHLElBQUksaUNBQW9CLENBQUM7SUFDdEQsUUFBUSxFQUFFLGlCQUFpQjtJQUMzQixhQUFhLEVBQUUsaUJBQWlCO0lBQ2hDLDhDQUE4QztDQUMvQyxDQUFDLENBQUM7QUFDVSxRQUFBLG9CQUFvQixHQUFHLGlDQUFvQixDQUFDO0FBQzVDLFFBQUEsb0JBQW9CLEdBQUcsSUFBSSxvQ0FBMEIsRUFBRSxDQUFDIn0=