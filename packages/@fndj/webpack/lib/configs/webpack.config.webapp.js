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
exports.configuration = void 0;
var plugins_1 = require("./plugins");
var rules_1 = require("./rules");
var settings_1 = require("./settings");
var webpack_config_common_1 = __importDefault(require("./webpack.config.common"));
exports.configuration = __assign(__assign({}, webpack_config_common_1.default), { target: 'web', entry: settings_1.entryPoint, resolve: __assign(__assign({}, webpack_config_common_1.default.resolve), { extensions: __spreadArrays(webpack_config_common_1.default.resolve.extensions, [
            '.tsx', '.css', '.scss'
        ]) }), module: __assign(__assign({}, webpack_config_common_1.default.module), { rules: [
            rules_1.workletRule,
            rules_1.typescriptRule,
            rules_1.reactTypescriptRule,
            rules_1.nodeRule,
            rules_1.globalStylesheetRule,
            rules_1.stylesheetRule,
            rules_1.imageRule,
            rules_1.fontRule,
            rules_1.htmlRule,
        ] }), plugins: __spreadArrays(webpack_config_common_1.default.plugins, [
        plugins_1.createIndexHtml,
        plugins_1.extractCssFiles,
        plugins_1.cleanBuildDir
    ]) });
exports.default = exports.configuration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcud2ViYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZ3Mvd2VicGFjay5jb25maWcud2ViYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLHFDQUE0RTtBQUM1RSxpQ0FHaUI7QUFDakIsdUNBQW9EO0FBQ3BELGtGQUE2QztBQUVoQyxRQUFBLGFBQWEseUJBQ25CLCtCQUFNLEtBQ1QsTUFBTSxFQUFFLEtBQUssRUFDYixLQUFLLEVBQUUscUJBQVUsRUFDakIsT0FBTyx3QkFDQSwrQkFBTSxDQUFDLE9BQU8sS0FDakIsVUFBVSxpQkFDSCwrQkFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVO1lBQzVCLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTztlQUkvQixNQUFNLHdCQUNDLCtCQUFNLENBQUMsTUFBTSxLQUNoQixLQUFLLEVBQUU7WUFDSCxtQkFBVztZQUNYLHNCQUFjO1lBQ2QsMkJBQW1CO1lBQ25CLGdCQUFRO1lBQ1IsNEJBQW9CO1lBQ3BCLHNCQUFjO1lBQ2QsaUJBQVM7WUFDVCxnQkFBUTtZQUNSLGdCQUFRO1NBQ1gsS0FFTCxPQUFPLGlCQUNBLCtCQUFNLENBQUMsT0FBTztRQUNqQix5QkFBZTtRQUNmLHlCQUFlO1FBQ2YsdUJBQWE7VUFFbkI7QUFFRixrQkFBZSxxQkFBYSxDQUFDIn0=