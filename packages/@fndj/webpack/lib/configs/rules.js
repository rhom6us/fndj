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
exports.htmlRule = exports.fontRule = exports.imageRule = exports.stylesheetRule = exports.globalStylesheetRule = exports.nodeRule = exports.typescriptRule = exports.wavRule = exports.wasmRule = exports.workerRule = exports.workletRule = exports.workletQueryRule = void 0;
var loaders = __importStar(require("./loaders"));
var settings_1 = require("./settings");
var node_modules = /node_modules/i;
//#region code
exports.workletQueryRule = {
    resourceQuery: /worklet/,
    // type: 'asset/resource',
    use: [
        loaders.worklet_loader,
    ],
};
exports.workletRule = {
    test: /\.worklet\.ts$/i,
    exclude: node_modules,
    use: [
        loaders.worklet_loader,
    ],
};
exports.workerRule = {
    test: /\.worker\.ts$/i,
    exclude: node_modules,
    use: [loaders.worker_loader],
};
exports.wasmRule = {
    test: /\.wasm$/i,
    exclude: node_modules,
    // type: 'asset/inline', // makes a data uri
    type: 'asset/resource', // emits a file
};
exports.wavRule = {
    test: /\.wav$/i,
    exclude: node_modules,
    // type: 'asset/inline', // makes a data uri
    type: 'asset/resource', // emits a file
};
exports.typescriptRule = {
    test: /\.[tj]sx?$/i,
    exclude: [node_modules],
    use: __spreadArray(__spreadArray([
        loaders.babel('top_level_await', 'class_properties')
    ], ifDev(loaders.typescript('react_refresh', 'transpile_only')), true), ifProd(loaders.typescript()), true),
};
// export const jsRule: RuleSetRule = {
//   test: /\.js$/i,
//   exclude: [node_modules],
//   use: [loaders.ts_with_react_refresh_loader],
// };
// export const scriptRule: RuleSetRule = {
//   test: /\.(j|t)sx?$/i,
//   exclude: [node_modules],
//   use: [babelLoader],
// };
exports.nodeRule = {
    test: /\.node$/i,
    use: loaders.node_loader,
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
    type: 'asset',
    // use: [loaders.imageLoader],
};
exports.fontRule = {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
    type: 'asset',
    // use: [loaders.fontLoader],
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
function ifProd() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    if (!settings_1.isDev) {
        return values;
    }
    return [];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlncy9ydWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaURBQXFDO0FBQ3JDLHVDQUFtQztBQUduQyxJQUFNLFlBQVksR0FBRyxlQUFlLENBQUM7QUFDckMsY0FBYztBQUVELFFBQUEsZ0JBQWdCLEdBQWU7SUFDMUMsYUFBYSxFQUFFLFNBQVM7SUFDeEIsMEJBQTBCO0lBQzFCLEdBQUcsRUFBRTtRQUNILE9BQU8sQ0FBQyxjQUFjO0tBQ3ZCO0NBQ0YsQ0FBQTtBQUNZLFFBQUEsV0FBVyxHQUFnQjtJQUN0QyxJQUFJLEVBQUUsaUJBQWlCO0lBQ3ZCLE9BQU8sRUFBRSxZQUFZO0lBQ3JCLEdBQUcsRUFBRTtRQUNILE9BQU8sQ0FBQyxjQUFjO0tBQ3ZCO0NBQ0YsQ0FBQztBQUNXLFFBQUEsVUFBVSxHQUFnQjtJQUNyQyxJQUFJLEVBQUUsZ0JBQWdCO0lBQ3RCLE9BQU8sRUFBRSxZQUFZO0lBQ3JCLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7Q0FDN0IsQ0FBQztBQUNXLFFBQUEsUUFBUSxHQUFnQjtJQUNuQyxJQUFJLEVBQUUsVUFBVTtJQUNoQixPQUFPLEVBQUUsWUFBWTtJQUNyQiw0Q0FBNEM7SUFDNUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFLGVBQWU7Q0FDeEMsQ0FBQztBQUNXLFFBQUEsT0FBTyxHQUFnQjtJQUNsQyxJQUFJLEVBQUUsU0FBUztJQUNmLE9BQU8sRUFBRSxZQUFZO0lBQ3JCLDRDQUE0QztJQUM1QyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZTtDQUN4QyxDQUFDO0FBQ1csUUFBQSxjQUFjLEdBQWdCO0lBQ3pDLElBQUksRUFBRSxhQUFhO0lBQ25CLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztJQUN2QixHQUFHO1FBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxrQkFBa0IsQ0FBQztPQUNqRCxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxTQUM1RCxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLE9BQ2hDO0NBQ0YsQ0FBQztBQUVGLHVDQUF1QztBQUN2QyxvQkFBb0I7QUFDcEIsNkJBQTZCO0FBQzdCLGlEQUFpRDtBQUNqRCxLQUFLO0FBQ0wsMkNBQTJDO0FBQzNDLDBCQUEwQjtBQUMxQiw2QkFBNkI7QUFDN0Isd0JBQXdCO0FBQ3hCLEtBQUs7QUFDUSxRQUFBLFFBQVEsR0FBZ0I7SUFDbkMsSUFBSSxFQUFFLFVBQVU7SUFDaEIsR0FBRyxFQUFFLE9BQU8sQ0FBQyxXQUFXO0NBQ3pCLENBQUM7QUFLRixZQUFZO0FBRVosZ0JBQWdCO0FBQ0gsUUFBQSxvQkFBb0IsR0FBZ0I7SUFDL0MsSUFBSSxFQUFFLDBCQUEwQjtJQUNoQyxHQUFHLGtDQUNFLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQzlCLE9BQU8sQ0FBQyxnQkFBZ0I7UUFDeEIsT0FBTyxDQUFDLFNBQVM7UUFDakIsT0FBTyxDQUFDLGFBQWE7UUFDckIsT0FBTyxDQUFDLFVBQVU7YUFDbkI7Q0FDRixDQUFDO0FBQ1csUUFBQSxjQUFjLEdBQWdCO0lBQ3pDLElBQUksRUFBRSxXQUFXO0lBQ2pCLE9BQU8sRUFBRSwwQkFBMEI7SUFDbkMsR0FBRyxrQ0FDRSxLQUFLLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxnQkFBZ0I7UUFDeEIsT0FBTyxDQUFDLGVBQWU7UUFDdkIsT0FBTyxDQUFDLGFBQWE7UUFDckIsT0FBTyxDQUFDLFVBQVU7YUFDbkI7Q0FDRixDQUFDO0FBQ0YsWUFBWTtBQUVaLGdCQUFnQjtBQUNoQix5Q0FBeUM7QUFDekMsd0NBQXdDO0FBQ3hDLDRCQUE0QjtBQUM1QixLQUFLO0FBQ1EsUUFBQSxTQUFTLEdBQWdCO0lBQ3BDLElBQUksRUFBRSxtQkFBbUI7SUFDekIsSUFBSSxFQUFFLE9BQU87SUFDYiw4QkFBOEI7Q0FDL0IsQ0FBQztBQUVXLFFBQUEsUUFBUSxHQUFnQjtJQUNuQyxJQUFJLEVBQUUsZ0RBQWdEO0lBQ3RELElBQUksRUFBRSxPQUFPO0lBQ2IsNkJBQTZCO0NBQzlCLENBQUM7QUFFVyxRQUFBLFFBQVEsR0FBZ0I7SUFDbkMsSUFBSSxFQUFFLFlBQVk7SUFDbEIsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDO0NBQ3JCLENBQUM7QUFDRixZQUFZO0FBR1osU0FBUyxLQUFLO0lBQWtCLGdCQUFZO1NBQVosVUFBWSxFQUFaLHFCQUFZLEVBQVosSUFBWTtRQUFaLDJCQUFZOztJQUMxQyxJQUFJLGdCQUFLLEVBQUU7UUFDVCxPQUFPLE1BQU0sQ0FBQztLQUNmO0lBQ0QsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDO0FBRUQsU0FBUyxNQUFNO0lBQWtCLGdCQUFZO1NBQVosVUFBWSxFQUFaLHFCQUFZLEVBQVosSUFBWTtRQUFaLDJCQUFZOztJQUMzQyxJQUFJLENBQUMsZ0JBQUssRUFBRTtRQUNWLE9BQU8sTUFBTSxDQUFDO0tBQ2Y7SUFDRCxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUMifQ==