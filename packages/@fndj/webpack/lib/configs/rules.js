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
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlRule = exports.fontRule = exports.imageRule = exports.stylesheetRule = exports.globalStylesheetRule = exports.nodeRule = exports.jsRule = exports.typescriptRule = exports.reactTypescriptRule = exports.waveRule = exports.wasmRule = exports.workerRule = exports.workletRule = void 0;
var loaders = __importStar(require("./loaders"));
var settings_1 = require("./settings");
var node_modules = /node_modules/i;
//#region code
exports.workletRule = {
    test: /\.worklet\.ts$/,
    exclude: node_modules,
    use: [loaders.workletLoader, loaders.tsLoader],
};
exports.workerRule = {
    test: /\.worker\.ts$/i,
    exclude: node_modules,
    use: [loaders.workerLoader],
};
exports.wasmRule = {
    test: /\.wasm$/i,
    exclude: node_modules,
    type: 'asset/inline', // makes a data uri
    // type: 'asset/resource', // emits a file
};
exports.waveRule = {
    test: /\.wav$/i,
    exclude: node_modules,
    // type: 'asset/inline', // makes a data uri
    type: 'asset/resource', // emits a file
};
exports.reactTypescriptRule = {
    test: /\.[tj]sx?$/i,
    exclude: [node_modules, exports.workletRule.test],
    use: __spreadArray(__spreadArray([], ifDev(loaders.reactRefreshLoader), true), [
        loaders.tsLoader
    ], false),
};
exports.typescriptRule = {
    test: /\.ts$/i,
    exclude: [node_modules, exports.workletRule.test],
    use: [loaders.tsLoader],
};
exports.jsRule = {
    test: /\.js$/i,
    exclude: [node_modules],
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
    use: __spreadArray(__spreadArray([], ifDev(loaders.cssHotLoader), true), [
        loaders.cssExtractLoader,
        loaders.cssLoader,
        loaders.postcssLoader,
        loaders.sassLoader
    ], false),
};
exports.stylesheetRule = {
    test: /\.s?css$/i,
    exclude: /\b(global|vars)\.s?css$/i,
    use: __spreadArray(__spreadArray([], ifDev(loaders.cssHotModuleLoader), true), [
        loaders.cssExtractLoader,
        loaders.cssModuleLoader,
        loaders.postcssLoader,
        loaders.sassLoader
    ], false),
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
function ifDev() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    if (settings_1.isDev) {
        return values;
    }
    return [];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlncy9ydWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsaURBQXFDO0FBQ3JDLHVDQUFtQztBQUduQyxJQUFNLFlBQVksR0FBRyxlQUFlLENBQUM7QUFDckMsY0FBYztBQUVELFFBQUEsV0FBVyxHQUFnQjtJQUN0QyxJQUFJLEVBQUUsZ0JBQWdCO0lBQ3RCLE9BQU8sRUFBRSxZQUFZO0lBQ3JCLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQztDQUMvQyxDQUFDO0FBQ1csUUFBQSxVQUFVLEdBQWdCO0lBQ3JDLElBQUksRUFBRSxnQkFBZ0I7SUFDdEIsT0FBTyxFQUFFLFlBQVk7SUFDckIsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztDQUM1QixDQUFDO0FBQ1csUUFBQSxRQUFRLEdBQWdCO0lBQ25DLElBQUksRUFBRSxVQUFVO0lBQ2hCLE9BQU8sRUFBRSxZQUFZO0lBQ3JCLElBQUksRUFBRSxjQUFjLEVBQUUsbUJBQW1CO0lBQ3pDLDBDQUEwQztDQUMzQyxDQUFDO0FBQ1csUUFBQSxRQUFRLEdBQWdCO0lBQ25DLElBQUksRUFBRSxTQUFTO0lBQ2YsT0FBTyxFQUFFLFlBQVk7SUFDckIsNENBQTRDO0lBQzVDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxlQUFlO0NBQ3hDLENBQUM7QUFDVyxRQUFBLG1CQUFtQixHQUFnQjtJQUM5QyxJQUFJLEVBQUUsYUFBYTtJQUNuQixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsbUJBQVcsQ0FBQyxJQUFJLENBQUM7SUFDekMsR0FBRyxrQ0FDRSxLQUFLLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxRQUFRO2FBQ2pCO0NBQ0YsQ0FBQztBQUNXLFFBQUEsY0FBYyxHQUFnQjtJQUN6QyxJQUFJLEVBQUUsUUFBUTtJQUNkLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxtQkFBVyxDQUFDLElBQUksQ0FBQztJQUN6QyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO0NBQ3hCLENBQUM7QUFDVyxRQUFBLE1BQU0sR0FBZ0I7SUFDakMsSUFBSSxFQUFFLFFBQVE7SUFDZCxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7SUFDdkIsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztDQUN4QixDQUFDO0FBQ0YsMkNBQTJDO0FBQzNDLDBCQUEwQjtBQUMxQiw2QkFBNkI7QUFDN0Isd0JBQXdCO0FBQ3hCLEtBQUs7QUFDUSxRQUFBLFFBQVEsR0FBZ0I7SUFDbkMsSUFBSSxFQUFFLFVBQVU7SUFDaEIsR0FBRyxFQUFFLE9BQU8sQ0FBQyxVQUFVO0NBQ3hCLENBQUM7QUFLRixZQUFZO0FBRVosZ0JBQWdCO0FBQ0gsUUFBQSxvQkFBb0IsR0FBZ0I7SUFDL0MsSUFBSSxFQUFFLDBCQUEwQjtJQUNoQyxHQUFHLGtDQUNFLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQzlCLE9BQU8sQ0FBQyxnQkFBZ0I7UUFDeEIsT0FBTyxDQUFDLFNBQVM7UUFDakIsT0FBTyxDQUFDLGFBQWE7UUFDckIsT0FBTyxDQUFDLFVBQVU7YUFDbkI7Q0FDRixDQUFDO0FBQ1csUUFBQSxjQUFjLEdBQWdCO0lBQ3pDLElBQUksRUFBRSxXQUFXO0lBQ2pCLE9BQU8sRUFBRSwwQkFBMEI7SUFDbkMsR0FBRyxrQ0FDRSxLQUFLLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxnQkFBZ0I7UUFDeEIsT0FBTyxDQUFDLGVBQWU7UUFDdkIsT0FBTyxDQUFDLGFBQWE7UUFDckIsT0FBTyxDQUFDLFVBQVU7YUFDbkI7Q0FDRixDQUFDO0FBQ0YsWUFBWTtBQUVaLGdCQUFnQjtBQUNoQix5Q0FBeUM7QUFDekMsd0NBQXdDO0FBQ3hDLDRCQUE0QjtBQUM1QixLQUFLO0FBQ1EsUUFBQSxTQUFTLEdBQWdCO0lBQ3BDLElBQUksRUFBRSxtQkFBbUI7SUFDekIsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztDQUMzQixDQUFDO0FBRVcsUUFBQSxRQUFRLEdBQWdCO0lBQ25DLElBQUksRUFBRSxnREFBZ0Q7SUFDdEQsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztDQUMxQixDQUFDO0FBRVcsUUFBQSxRQUFRLEdBQWdCO0lBQ25DLElBQUksRUFBRSxZQUFZO0lBQ2xCLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztDQUNyQixDQUFDO0FBQ0YsWUFBWTtBQUdaLFNBQVMsS0FBSztJQUFrQixnQkFBWTtTQUFaLFVBQVksRUFBWixxQkFBWSxFQUFaLElBQVk7UUFBWiwyQkFBWTs7SUFDMUMsSUFBSSxnQkFBSyxFQUFFO1FBQ1QsT0FBTyxNQUFNLENBQUM7S0FDZjtJQUNELE9BQU8sRUFBRSxDQUFDO0FBQ1osQ0FBQyJ9