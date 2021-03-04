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
    use: ['react-hot-loader/webpack'],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlncy9ydWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLG9GQUEyRDtBQUUzRCxxQ0FHbUI7QUFDbkIsdUNBQW1DO0FBRW5DLElBQU0sWUFBWSxHQUFHLGVBQWUsQ0FBQztBQUNyQyxjQUFjO0FBRUQsUUFBQSxXQUFXLEdBQWdCO0lBQ3RDLElBQUksRUFBRSxnQkFBZ0I7SUFDdEIsR0FBRyxFQUFFLENBQUMsdUJBQWEsQ0FBQztDQUNyQixDQUFDO0FBQ1csUUFBQSxtQkFBbUIsR0FBZ0I7SUFDOUMsSUFBSSxFQUFFLFVBQVU7SUFDaEIsT0FBTyxFQUFFLFlBQVk7SUFDckIsR0FBRyxFQUFFLENBQUMsMEJBQTBCLENBQUM7Q0FDbEMsQ0FBQztBQUNXLFFBQUEsY0FBYyxHQUFnQjtJQUN6QyxJQUFJLEVBQUUsUUFBUTtJQUNkLEdBQUcsRUFBRSxDQUFDLGtCQUFRLENBQUM7Q0FDaEIsQ0FBQztBQUNXLFFBQUEsVUFBVSxHQUFnQjtJQUNyQyxJQUFJLEVBQUUsY0FBYztJQUNwQixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7SUFDdkIsR0FBRyxFQUFFLENBQUMscUJBQVcsQ0FBQztDQUNuQixDQUFDO0FBQ1csUUFBQSxRQUFRLEdBQWdCO0lBQ25DLElBQUksRUFBRSxVQUFVO0lBQ2hCLEdBQUcsRUFBRSxvQkFBVTtDQUNoQixDQUFDO0FBRVcsUUFBQSxVQUFVLEdBQWdCO0lBQ3JDLElBQUksRUFBRSxnQkFBZ0I7SUFDdEIsR0FBRyxFQUFFLENBQUMsZUFBZSxFQUFFLGtCQUFRLENBQUM7SUFDaEMsTUFBTSxFQUFFLGVBQWU7SUFDdkIsT0FBTyxFQUFFLEVBRVI7Q0FDRixDQUFDO0FBR0YsWUFBWTtBQUVaLGdCQUFnQjtBQUNILFFBQUEsb0JBQW9CLEdBQWdCO0lBQy9DLElBQUksRUFBRSwwQkFBMEI7SUFDaEMsR0FBRyxrQ0FBTSxDQUFDLGdCQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBRSxpQ0FBb0IsQ0FBQyxNQUFNLEVBQUUsbUJBQVMsRUFBRSx1QkFBYSxFQUFFLG9CQUFVLEVBQUM7Q0FDM0csQ0FBQztBQUNXLFFBQUEsY0FBYyxHQUFnQjtJQUN6QyxJQUFJLEVBQUUsV0FBVztJQUNqQixPQUFPLEVBQUUsMEJBQTBCO0lBQ25DLEdBQUcsa0NBQU0sQ0FBQyxnQkFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLDRCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFFLGlDQUFvQixDQUFDLE1BQU0sRUFBRSx5QkFBZSxFQUFFLHVCQUFhLEVBQUUsb0JBQVUsRUFBQztDQUN2SCxDQUFDO0FBQ0YsWUFBWTtBQUVaLGdCQUFnQjtBQUNoQix5Q0FBeUM7QUFDekMsd0NBQXdDO0FBQ3hDLDRCQUE0QjtBQUM1QixLQUFLO0FBQ1EsUUFBQSxTQUFTLEdBQWdCO0lBQ3BDLElBQUksRUFBRSxtQkFBbUI7SUFDekIsR0FBRyxFQUFFLENBQUMscUJBQVcsQ0FBQztDQUNuQixDQUFDO0FBRVcsUUFBQSxRQUFRLEdBQWdCO0lBQ25DLElBQUksRUFBRSxnREFBZ0Q7SUFDdEQsR0FBRyxFQUFFLENBQUMsb0JBQVUsQ0FBQztDQUNsQixDQUFDO0FBRVcsUUFBQSxRQUFRLEdBQWdCO0lBQ25DLElBQUksRUFBRSxZQUFZO0lBQ2xCLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztDQUNyQixDQUFDO0FBQ0YsWUFBWSJ9