"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
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
    exclude: [node_modules],
    use: [{
            loader: 'worklet-loader',
            options: {
                //configFile: 'tsconfig.1.json',
                transpileOnly: true,
            },
        }],
};
exports.reactTypescriptRule = {
    test: /\.tsx?$/i,
    exclude: node_modules,
    use: ['react-hot-loader/webpack'],
};
exports.typescriptRule = {
    test: /\.ts$/i,
    exclude: node_modules,
    use: [loaders_1.tsLoader],
};
exports.scriptRule = {
    test: /\.(j|t)sx?$/i,
    exclude: [node_modules],
    use: [loaders_1.babelLoader],
};
exports.nodeRule = {
    test: /\.node$/i,
    use: 'node-loader',
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
    use: __spreadArrays((settings_1.isDev ? [loaders_1.cssHotLoader] : []), [mini_css_extract_plugin_1.default.loader, loaders_1.cssLoader, loaders_1.postcssLoader, loaders_1.sassLoader]),
};
exports.stylesheetRule = {
    test: /\.s?css$/i,
    exclude: /\b(global|vars)\.s?css$/i,
    use: __spreadArrays((settings_1.isDev ? [loaders_1.cssHotModuleLoader] : []), [mini_css_extract_plugin_1.default.loader, loaders_1.cssModuleLoader, loaders_1.postcssLoader, loaders_1.sassLoader]),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlncy9ydWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsb0ZBQTJEO0FBRTNELHFDQUdtQjtBQUNuQix1Q0FBbUM7QUFFbkMsSUFBTSxZQUFZLEdBQUcsZUFBZSxDQUFDO0FBQ3JDLGNBQWM7QUFFRCxRQUFBLFdBQVcsR0FBZ0I7SUFDdEMsSUFBSSxFQUFFLGdCQUFnQjtJQUN0QixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7SUFDdkIsR0FBRyxFQUFFLENBQUM7WUFDSixNQUFNLEVBQUUsZ0JBQWdCO1lBQ3hCLE9BQU8sRUFBRTtnQkFDUCxnQ0FBZ0M7Z0JBQ2hDLGFBQWEsRUFBRSxJQUFJO2FBQ3BCO1NBQ0YsQ0FBQztDQUNILENBQUM7QUFDVyxRQUFBLG1CQUFtQixHQUFnQjtJQUM5QyxJQUFJLEVBQUUsVUFBVTtJQUNoQixPQUFPLEVBQUUsWUFBWTtJQUNyQixHQUFHLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztDQUNsQyxDQUFDO0FBQ1csUUFBQSxjQUFjLEdBQWdCO0lBQ3pDLElBQUksRUFBRSxRQUFRO0lBQ2QsT0FBTyxFQUFFLFlBQVk7SUFDckIsR0FBRyxFQUFFLENBQUMsa0JBQVEsQ0FBQztDQUNoQixDQUFDO0FBQ1csUUFBQSxVQUFVLEdBQWdCO0lBQ3JDLElBQUksRUFBRSxjQUFjO0lBQ3BCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztJQUN2QixHQUFHLEVBQUUsQ0FBQyxxQkFBVyxDQUFDO0NBQ25CLENBQUM7QUFDVyxRQUFBLFFBQVEsR0FBZ0I7SUFDbkMsSUFBSSxFQUFFLFVBQVU7SUFDaEIsR0FBRyxFQUFFLGFBQWE7Q0FDbkIsQ0FBQztBQUVXLFFBQUEsVUFBVSxHQUFnQjtJQUNyQyxJQUFJLEVBQUUsZ0JBQWdCO0lBQ3RCLEdBQUcsRUFBRSxDQUFDLGVBQWUsRUFBRSxrQkFBUSxDQUFDO0lBQ2hDLE1BQU0sRUFBRSxlQUFlO0lBQ3ZCLE9BQU8sRUFBRSxFQUVSO0NBQ0YsQ0FBQztBQUdGLFlBQVk7QUFFWixnQkFBZ0I7QUFDSCxRQUFBLG9CQUFvQixHQUFnQjtJQUMvQyxJQUFJLEVBQUUsMEJBQTBCO0lBQ2hDLEdBQUcsaUJBQU0sQ0FBQyxnQkFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUUsaUNBQW9CLENBQUMsTUFBTSxFQUFFLG1CQUFTLEVBQUUsdUJBQWEsRUFBRSxvQkFBVSxFQUFDO0NBQzNHLENBQUM7QUFDVyxRQUFBLGNBQWMsR0FBZ0I7SUFDekMsSUFBSSxFQUFFLFdBQVc7SUFDakIsT0FBTyxFQUFFLDBCQUEwQjtJQUNuQyxHQUFHLGlCQUFNLENBQUMsZ0JBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyw0QkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRSxpQ0FBb0IsQ0FBQyxNQUFNLEVBQUUseUJBQWUsRUFBRSx1QkFBYSxFQUFFLG9CQUFVLEVBQUM7Q0FDdkgsQ0FBQztBQUNGLFlBQVk7QUFFWixnQkFBZ0I7QUFDaEIseUNBQXlDO0FBQ3pDLHdDQUF3QztBQUN4Qyw0QkFBNEI7QUFDNUIsS0FBSztBQUNRLFFBQUEsU0FBUyxHQUFnQjtJQUNwQyxJQUFJLEVBQUUsbUJBQW1CO0lBQ3pCLEdBQUcsRUFBRSxDQUFDLHFCQUFXLENBQUM7Q0FDbkIsQ0FBQztBQUVXLFFBQUEsUUFBUSxHQUFnQjtJQUNuQyxJQUFJLEVBQUUsZ0RBQWdEO0lBQ3RELEdBQUcsRUFBRSxDQUFDLG9CQUFVLENBQUM7Q0FDbEIsQ0FBQztBQUVXLFFBQUEsUUFBUSxHQUFnQjtJQUNuQyxJQUFJLEVBQUUsWUFBWTtJQUNsQixHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7Q0FDckIsQ0FBQztBQUNGLFlBQVkifQ==