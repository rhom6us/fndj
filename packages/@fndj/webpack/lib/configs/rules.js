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
exports.htmlRule = exports.fontRule = exports.imageRule = exports.stylesheetRule = exports.globalStylesheetRule = exports.nodeRule = exports.jsRule = exports.typescriptRule = exports.reactTypescriptRule = exports.waveRule = exports.wasmRule = exports.workerRule = exports.workletRule = void 0;
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
exports.wasmRule = {
    test: /\.wasm$/i,
    // type: 'asset/inline', // makes a data uri
    type: 'asset/resource', // emits a file
};
exports.waveRule = {
    test: /\.wav$/i,
    // type: 'asset/inline', // makes a data uri
    type: 'asset/resource', // emits a file
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
exports.jsRule = {
    test: /\.js$/i,
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
    use: __spreadArray(__spreadArray([], (settings_1.isDev ? [loaders.cssHotLoader] : []), true), [mini_css_extract_plugin_1.default.loader, loaders.cssLoader, loaders.postcssLoader, loaders.sassLoader], false),
};
exports.stylesheetRule = {
    test: /\.s?css$/i,
    exclude: /\b(global|vars)\.s?css$/i,
    use: __spreadArray(__spreadArray([], (settings_1.isDev ? [loaders.cssHotModuleLoader] : []), true), [mini_css_extract_plugin_1.default.loader, loaders.cssModuleLoader, loaders.postcssLoader, loaders.sassLoader], false),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlncy9ydWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0ZBQTJEO0FBRTNELGlEQUFxQztBQUNyQyx1Q0FBbUM7QUFHbkMsSUFBTSxZQUFZLEdBQUcsZUFBZSxDQUFDO0FBQ3JDLGNBQWM7QUFFRCxRQUFBLFdBQVcsR0FBZ0I7SUFDdEMsSUFBSSxFQUFFLGdCQUFnQjtJQUN0QixHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO0NBQzdCLENBQUM7QUFDVyxRQUFBLFVBQVUsR0FBZ0I7SUFDckMsSUFBSSxFQUFFLGdCQUFnQjtJQUN0QixHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO0NBQzVCLENBQUM7QUFDVyxRQUFBLFFBQVEsR0FBZ0I7SUFDbkMsSUFBSSxFQUFFLFVBQVU7SUFDaEIsNENBQTRDO0lBQzVDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxlQUFlO0NBQ3hDLENBQUM7QUFDVyxRQUFBLFFBQVEsR0FBZ0I7SUFDbkMsSUFBSSxFQUFFLFNBQVM7SUFDZiw0Q0FBNEM7SUFDNUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFLGVBQWU7Q0FDeEMsQ0FBQztBQUNXLFFBQUEsbUJBQW1CLEdBQWdCO0lBQzlDLElBQUksRUFBRSxVQUFVO0lBQ2hCLE9BQU8sRUFBRSxZQUFZO0lBQ3JCLEdBQUcsRUFBRTtRQUNILGdCQUFLLElBQUksT0FBTyxDQUFDLGtCQUFrQjtRQUNuQyxPQUFPLENBQUMsUUFBUTtLQUNqQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7Q0FDbEIsQ0FBQztBQUNXLFFBQUEsY0FBYyxHQUFnQjtJQUN6QyxJQUFJLEVBQUUsUUFBUTtJQUNkLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7Q0FDeEIsQ0FBQztBQUNXLFFBQUEsTUFBTSxHQUFnQjtJQUNqQyxJQUFJLEVBQUUsUUFBUTtJQUNkLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7Q0FDeEIsQ0FBQztBQUNGLDJDQUEyQztBQUMzQywwQkFBMEI7QUFDMUIsNkJBQTZCO0FBQzdCLHdCQUF3QjtBQUN4QixLQUFLO0FBQ1EsUUFBQSxRQUFRLEdBQWdCO0lBQ25DLElBQUksRUFBRSxVQUFVO0lBQ2hCLEdBQUcsRUFBRSxPQUFPLENBQUMsVUFBVTtDQUN4QixDQUFDO0FBSUYsWUFBWTtBQUVaLGdCQUFnQjtBQUNILFFBQUEsb0JBQW9CLEdBQWdCO0lBQy9DLElBQUksRUFBRSwwQkFBMEI7SUFDaEMsR0FBRyxrQ0FBTSxDQUFDLGdCQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBRSxpQ0FBb0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxVQUFVLFNBQUM7Q0FDM0ksQ0FBQztBQUNXLFFBQUEsY0FBYyxHQUFnQjtJQUN6QyxJQUFJLEVBQUUsV0FBVztJQUNqQixPQUFPLEVBQUUsMEJBQTBCO0lBQ25DLEdBQUcsa0NBQU0sQ0FBQyxnQkFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBRSxpQ0FBb0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxVQUFVLFNBQUM7Q0FDdkosQ0FBQztBQUNGLFlBQVk7QUFFWixnQkFBZ0I7QUFDaEIseUNBQXlDO0FBQ3pDLHdDQUF3QztBQUN4Qyw0QkFBNEI7QUFDNUIsS0FBSztBQUNRLFFBQUEsU0FBUyxHQUFnQjtJQUNwQyxJQUFJLEVBQUUsbUJBQW1CO0lBQ3pCLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7Q0FDM0IsQ0FBQztBQUVXLFFBQUEsUUFBUSxHQUFnQjtJQUNuQyxJQUFJLEVBQUUsZ0RBQWdEO0lBQ3RELEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7Q0FDMUIsQ0FBQztBQUVXLFFBQUEsUUFBUSxHQUFnQjtJQUNuQyxJQUFJLEVBQUUsWUFBWTtJQUNsQixHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7Q0FDckIsQ0FBQztBQUNGLFlBQVkifQ==