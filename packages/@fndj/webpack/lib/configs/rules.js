"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlRule = exports.fontRule = exports.imageRule = exports.stylesheetRule = exports.globalStylesheetRule = exports.nodeRule = exports.typescriptRule = exports.reactTypescriptRule = exports.workerRule = exports.workletRule = void 0;
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var loaders = __importStar(require("./loaders"));
var settings_1 = require("./settings");
var node_modules = /node_modules/i;
//#region code
exports.workletRule = {
    test: /\.worklet\.ts$/,
    use: [loaders.workletLoader],
};
exports.workerRule = {
    test: /\.worker\.ts$/i,
    use: [loaders.workerLoader],
};
exports.reactTypescriptRule = {
    test: /\.tsx?$/i,
    exclude: node_modules,
    use: [
        settings_1.isDev && loaders.reactRefreshLoader,
        loaders.tsLoader
    ].filter(Boolean),
};
exports.typescriptRule = {
    test: /\.ts$/i,
    use: [loaders.tsLoader],
};
// export const scriptRule: RuleSetRule = {
//   test: /\.(j|t)sx?$/i,
//   exclude: [node_modules],
//   use: [babelLoader],
// };
exports.nodeRule = {
    test: /\.node$/i,
    use: loaders.nodeLoader,
};
//#endregion
//#region styles
exports.globalStylesheetRule = {
    test: /\b(global|vars)\.s?css$/i,
    use: __spreadArray(__spreadArray([], (settings_1.isDev ? [loaders.cssHotLoader] : [])), [mini_css_extract_plugin_1.default.loader, loaders.cssLoader, loaders.postcssLoader, loaders.sassLoader]),
};
exports.stylesheetRule = {
    test: /\.s?css$/i,
    exclude: /\b(global|vars)\.s?css$/i,
    use: __spreadArray(__spreadArray([], (settings_1.isDev ? [loaders.cssHotModuleLoader] : [])), [mini_css_extract_plugin_1.default.loader, loaders.cssModuleLoader, loaders.postcssLoader, loaders.sassLoader]),
};
//#endregion
//#region assets
// export const assetRule:RuleSetRule = {
//   test: /\.(png|svg|jpg|jpeg|gif)$/i,
//   type: 'asset/resource',
// };
exports.imageRule = {
    test: /\.(png|jpg|gif)$/i,
    use: [loaders.imageLoader],
};
exports.fontRule = {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
    use: [loaders.fontLoader],
};
exports.htmlRule = {
    test: /\.(html)$/i,
    use: ['html-loader'],
};
//#endregion
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlncy9ydWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRkFBMkQ7QUFFM0QsaURBQXFDO0FBQ3JDLHVDQUFtQztBQUduQyxJQUFNLFlBQVksR0FBRyxlQUFlLENBQUM7QUFDckMsY0FBYztBQUVELFFBQUEsV0FBVyxHQUFnQjtJQUN0QyxJQUFJLEVBQUUsZ0JBQWdCO0lBQ3RCLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7Q0FDN0IsQ0FBQztBQUNXLFFBQUEsVUFBVSxHQUFnQjtJQUNyQyxJQUFJLEVBQUUsZ0JBQWdCO0lBQ3RCLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7Q0FDNUIsQ0FBQztBQUNXLFFBQUEsbUJBQW1CLEdBQWdCO0lBQzlDLElBQUksRUFBRSxVQUFVO0lBQ2hCLE9BQU8sRUFBRSxZQUFZO0lBQ3JCLEdBQUcsRUFBRTtRQUNILGdCQUFLLElBQUksT0FBTyxDQUFDLGtCQUFrQjtRQUNuQyxPQUFPLENBQUMsUUFBUTtLQUNqQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7Q0FDbEIsQ0FBQztBQUNXLFFBQUEsY0FBYyxHQUFnQjtJQUN6QyxJQUFJLEVBQUUsUUFBUTtJQUNkLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7Q0FDeEIsQ0FBQztBQUNGLDJDQUEyQztBQUMzQywwQkFBMEI7QUFDMUIsNkJBQTZCO0FBQzdCLHdCQUF3QjtBQUN4QixLQUFLO0FBQ1EsUUFBQSxRQUFRLEdBQWdCO0lBQ25DLElBQUksRUFBRSxVQUFVO0lBQ2hCLEdBQUcsRUFBRSxPQUFPLENBQUMsVUFBVTtDQUN4QixDQUFDO0FBSUYsWUFBWTtBQUVaLGdCQUFnQjtBQUNILFFBQUEsb0JBQW9CLEdBQWdCO0lBQy9DLElBQUksRUFBRSwwQkFBMEI7SUFDaEMsR0FBRyxrQ0FBTSxDQUFDLGdCQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBRSxpQ0FBb0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxVQUFVLEVBQUM7Q0FDM0ksQ0FBQztBQUNXLFFBQUEsY0FBYyxHQUFnQjtJQUN6QyxJQUFJLEVBQUUsV0FBVztJQUNqQixPQUFPLEVBQUUsMEJBQTBCO0lBQ25DLEdBQUcsa0NBQU0sQ0FBQyxnQkFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBRSxpQ0FBb0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxVQUFVLEVBQUM7Q0FDdkosQ0FBQztBQUNGLFlBQVk7QUFFWixnQkFBZ0I7QUFDaEIseUNBQXlDO0FBQ3pDLHdDQUF3QztBQUN4Qyw0QkFBNEI7QUFDNUIsS0FBSztBQUNRLFFBQUEsU0FBUyxHQUFnQjtJQUNwQyxJQUFJLEVBQUUsbUJBQW1CO0lBQ3pCLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7Q0FDM0IsQ0FBQztBQUVXLFFBQUEsUUFBUSxHQUFnQjtJQUNuQyxJQUFJLEVBQUUsZ0RBQWdEO0lBQ3RELEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7Q0FDMUIsQ0FBQztBQUVXLFFBQUEsUUFBUSxHQUFnQjtJQUNuQyxJQUFJLEVBQUUsWUFBWTtJQUNsQixHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7Q0FDckIsQ0FBQztBQUNGLFlBQVkifQ==