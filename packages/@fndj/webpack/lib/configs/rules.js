"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlRule = exports.fontRule = exports.imageRule = exports.stylesheetRule = exports.globalStylesheetRule = exports.workerRule = exports.nodeRule = exports.scriptRule = exports.typescriptRule = exports.reactTypescriptRule = exports.workletRule = void 0;
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var loaders_1 = require("./loaders");
var settings_1 = require("./settings");
var node_modules = /node_modules/i;
//#region code
exports.workletRule = {
    test: /\.worklet\.ts$/,
    use: [loaders_1.workletLoader],
};
exports.reactTypescriptRule = {
    test: /\.tsx?$/i,
    exclude: node_modules,
    use: ['react-hot-loader/webpack', loaders_1.tsLoader],
};
exports.typescriptRule = {
    test: /\.ts$/i,
    use: [loaders_1.tsLoader],
};
exports.scriptRule = {
    test: /\.(j|t)sx?$/i,
    exclude: [node_modules],
    use: [loaders_1.babelLoader],
};
exports.nodeRule = {
    test: /\.node$/i,
    use: loaders_1.nodeLoader,
};
exports.workerRule = {
    test: /\.worker\.ts$/i,
    use: ['worker-loader', loaders_1.tsLoader],
    loader: "worker-loader",
    options: {},
};
//#endregion
//#region styles
exports.globalStylesheetRule = {
    test: /\b(global|vars)\.s?css$/i,
    use: __spreadArray(__spreadArray([], (settings_1.isDev ? [loaders_1.cssHotLoader] : [])), [mini_css_extract_plugin_1.default.loader, loaders_1.cssLoader, loaders_1.postcssLoader, loaders_1.sassLoader]),
};
exports.stylesheetRule = {
    test: /\.s?css$/i,
    exclude: /\b(global|vars)\.s?css$/i,
    use: __spreadArray(__spreadArray([], (settings_1.isDev ? [loaders_1.cssHotModuleLoader] : [])), [mini_css_extract_plugin_1.default.loader, loaders_1.cssModuleLoader, loaders_1.postcssLoader, loaders_1.sassLoader]),
};
//#endregion
//#region assets
// export const assetRule:RuleSetRule = {
//   test: /\.(png|svg|jpg|jpeg|gif)$/i,
//   type: 'asset/resource',
// };
exports.imageRule = {
    test: /\.(png|jpg|gif)$/i,
    use: [loaders_1.imageLoader],
};
exports.fontRule = {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
    use: [loaders_1.fontLoader],
};
exports.htmlRule = {
    test: /\.(html)$/i,
    use: ['html-loader'],
};
//#endregion
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlncy9ydWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLG9GQUEyRDtBQUUzRCxxQ0FHbUI7QUFDbkIsdUNBQW1DO0FBRW5DLElBQU0sWUFBWSxHQUFHLGVBQWUsQ0FBQztBQUNyQyxjQUFjO0FBRUQsUUFBQSxXQUFXLEdBQWdCO0lBQ3RDLElBQUksRUFBRSxnQkFBZ0I7SUFDdEIsR0FBRyxFQUFFLENBQUMsdUJBQWEsQ0FBQztDQUNyQixDQUFDO0FBQ1csUUFBQSxtQkFBbUIsR0FBZ0I7SUFDOUMsSUFBSSxFQUFFLFVBQVU7SUFDaEIsT0FBTyxFQUFFLFlBQVk7SUFDckIsR0FBRyxFQUFFLENBQUMsMEJBQTBCLEVBQUUsa0JBQVEsQ0FBQztDQUM1QyxDQUFDO0FBQ1csUUFBQSxjQUFjLEdBQWdCO0lBQ3pDLElBQUksRUFBRSxRQUFRO0lBQ2QsR0FBRyxFQUFFLENBQUMsa0JBQVEsQ0FBQztDQUNoQixDQUFDO0FBQ1csUUFBQSxVQUFVLEdBQWdCO0lBQ3JDLElBQUksRUFBRSxjQUFjO0lBQ3BCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztJQUN2QixHQUFHLEVBQUUsQ0FBQyxxQkFBVyxDQUFDO0NBQ25CLENBQUM7QUFDVyxRQUFBLFFBQVEsR0FBZ0I7SUFDbkMsSUFBSSxFQUFFLFVBQVU7SUFDaEIsR0FBRyxFQUFFLG9CQUFVO0NBQ2hCLENBQUM7QUFFVyxRQUFBLFVBQVUsR0FBZ0I7SUFDckMsSUFBSSxFQUFFLGdCQUFnQjtJQUN0QixHQUFHLEVBQUUsQ0FBQyxlQUFlLEVBQUUsa0JBQVEsQ0FBQztJQUNoQyxNQUFNLEVBQUUsZUFBZTtJQUN2QixPQUFPLEVBQUUsRUFFUjtDQUNGLENBQUM7QUFHRixZQUFZO0FBRVosZ0JBQWdCO0FBQ0gsUUFBQSxvQkFBb0IsR0FBZ0I7SUFDL0MsSUFBSSxFQUFFLDBCQUEwQjtJQUNoQyxHQUFHLGtDQUFNLENBQUMsZ0JBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxzQkFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFFLGlDQUFvQixDQUFDLE1BQU0sRUFBRSxtQkFBUyxFQUFFLHVCQUFhLEVBQUUsb0JBQVUsRUFBQztDQUMzRyxDQUFDO0FBQ1csUUFBQSxjQUFjLEdBQWdCO0lBQ3pDLElBQUksRUFBRSxXQUFXO0lBQ2pCLE9BQU8sRUFBRSwwQkFBMEI7SUFDbkMsR0FBRyxrQ0FBTSxDQUFDLGdCQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsNEJBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUUsaUNBQW9CLENBQUMsTUFBTSxFQUFFLHlCQUFlLEVBQUUsdUJBQWEsRUFBRSxvQkFBVSxFQUFDO0NBQ3ZILENBQUM7QUFDRixZQUFZO0FBRVosZ0JBQWdCO0FBQ2hCLHlDQUF5QztBQUN6Qyx3Q0FBd0M7QUFDeEMsNEJBQTRCO0FBQzVCLEtBQUs7QUFDUSxRQUFBLFNBQVMsR0FBZ0I7SUFDcEMsSUFBSSxFQUFFLG1CQUFtQjtJQUN6QixHQUFHLEVBQUUsQ0FBQyxxQkFBVyxDQUFDO0NBQ25CLENBQUM7QUFFVyxRQUFBLFFBQVEsR0FBZ0I7SUFDbkMsSUFBSSxFQUFFLGdEQUFnRDtJQUN0RCxHQUFHLEVBQUUsQ0FBQyxvQkFBVSxDQUFDO0NBQ2xCLENBQUM7QUFFVyxRQUFBLFFBQVEsR0FBZ0I7SUFDbkMsSUFBSSxFQUFFLFlBQVk7SUFDbEIsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDO0NBQ3JCLENBQUM7QUFDRixZQUFZIn0=