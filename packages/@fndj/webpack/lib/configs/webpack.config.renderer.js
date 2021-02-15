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
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var plugins_1 = require("./plugins");
var rules_1 = require("./rules");
var webpack_config_common_1 = __importDefault(require("./webpack.config.common"));
exports.default = __assign(__assign({}, webpack_config_common_1.default), { target: 'electron-renderer', resolve: __assign(__assign({}, webpack_config_common_1.default.resolve), { extensions: __spreadArrays(webpack_config_common_1.default.resolve.extensions, ['.tsx', '.css', '.scss']) }), module: __assign(__assign({}, webpack_config_common_1.default.module), { rules: __spreadArrays(webpack_config_common_1.default.module.rules, [rules_1.reactTypescriptRule, rules_1.nodeRule, rules_1.globalStylesheetRule, rules_1.stylesheetRule, rules_1.imageRule, rules_1.fontRule, rules_1.htmlRule, rules_1.workletRule]) }), plugins: __spreadArrays(webpack_config_common_1.default.plugins, [
        plugins_1.createIndexHtml,
        mini_css_extract_plugin_1.default
    ]) });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcucmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlncy93ZWJwYWNrLmNvbmZpZy5yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9GQUEyRDtBQUUzRCxxQ0FBNEM7QUFDNUMsaUNBR2lCO0FBQ2pCLGtGQUE2QztBQUU3QyxrQkFBZSxzQkFDViwrQkFBTSxLQUNULE1BQU0sRUFBRSxtQkFBbUIsRUFDM0IsT0FBTyx3QkFDRiwrQkFBTSxDQUFDLE9BQU8sS0FDakIsVUFBVSxpQkFBTSwrQkFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLE9BRXBFLE1BQU0sd0JBQ0QsK0JBQU0sQ0FBQyxNQUFNLEtBQ2hCLEtBQUssaUJBQU0sK0JBQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFFLDJCQUFtQixFQUFFLGdCQUFRLEVBQUUsNEJBQW9CLEVBQUUsc0JBQWMsRUFBRSxpQkFBUyxFQUFFLGdCQUFRLEVBQUUsZ0JBQVEsRUFBRSxtQkFBVyxPQUVqSixPQUFPLGlCQUNGLCtCQUFNLENBQUMsT0FBTztRQUNqQix5QkFBZTtRQUNmLGlDQUFvQjtTQUVFLENBQUMifQ==