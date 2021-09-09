"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var plugins = __importStar(require("./plugins"));
var rules = __importStar(require("./rules"));
var webpack_config_common_1 = __importDefault(require("./webpack.config.common"));
exports.default = __assign(__assign({}, webpack_config_common_1.default), { target: 'electron-renderer', resolve: __assign(__assign({}, webpack_config_common_1.default.resolve), { extensions: __spreadArray(__spreadArray([], webpack_config_common_1.default.resolve.extensions, true), ['.tsx', '.css', '.scss'], false) }), module: __assign(__assign({}, webpack_config_common_1.default.module), { rules: __spreadArray(__spreadArray([], webpack_config_common_1.default.module.rules, true), [
            rules.reactTypescriptRule,
            rules.nodeRule,
            rules.globalStylesheetRule,
            rules.stylesheetRule,
            rules.imageRule,
            rules.fontRule,
            rules.htmlRule,
            rules.workletRule
        ], false) }), plugins: __spreadArray(__spreadArray([], webpack_config_common_1.default.plugins, true), [
        plugins.createIndexHtml,
        plugins.miniCssExtractPlugin
    ], false) });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcucmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlncy93ZWJwYWNrLmNvbmZpZy5yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGlEQUFxQztBQUNyQyw2Q0FBaUM7QUFDakMsa0ZBQTZDO0FBRTdDLGtCQUFlLHNCQUNWLCtCQUFNLEtBQ1QsTUFBTSxFQUFFLG1CQUFtQixFQUMzQixPQUFPLHdCQUNGLCtCQUFNLENBQUMsT0FBTyxLQUNqQixVQUFVLGtDQUFNLCtCQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsVUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sY0FFcEUsTUFBTSx3QkFDRCwrQkFBTSxDQUFDLE1BQU0sS0FDaEIsS0FBSyxrQ0FDQSwrQkFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLO1lBQ3RCLEtBQUssQ0FBQyxtQkFBbUI7WUFDekIsS0FBSyxDQUFDLFFBQVE7WUFDZCxLQUFLLENBQUMsb0JBQW9CO1lBQzFCLEtBQUssQ0FBQyxjQUFjO1lBQ3BCLEtBQUssQ0FBQyxTQUFTO1lBQ2YsS0FBSyxDQUFDLFFBQVE7WUFDZCxLQUFLLENBQUMsUUFBUTtZQUNkLEtBQUssQ0FBQyxXQUFXO3NCQUdyQixPQUFPLGtDQUNGLCtCQUFNLENBQUMsT0FBTztRQUNqQixPQUFPLENBQUMsZUFBZTtRQUN2QixPQUFPLENBQUMsb0JBQW9CO2dCQUVOLENBQUMifQ==