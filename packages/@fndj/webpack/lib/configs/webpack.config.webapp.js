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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
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
exports.configuration = __assign(__assign({}, webpack_config_common_1.default), { target: 'web', entry: settings_1.entryPoint, resolve: __assign(__assign({}, webpack_config_common_1.default.resolve), { extensions: __spreadArray(__spreadArray([], webpack_config_common_1.default.resolve.extensions), [
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
        ] }), plugins: __spreadArray(__spreadArray([], webpack_config_common_1.default.plugins), [
        plugins_1.createIndexHtml,
        plugins_1.extractCssFiles,
        plugins_1.cleanBuildDir
    ]) });
exports.default = exports.configuration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcud2ViYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZ3Mvd2VicGFjay5jb25maWcud2ViYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxxQ0FBNEU7QUFDNUUsaUNBR2lCO0FBQ2pCLHVDQUFvRDtBQUNwRCxrRkFBNkM7QUFFaEMsUUFBQSxhQUFhLHlCQUNuQiwrQkFBTSxLQUNULE1BQU0sRUFBRSxLQUFLLEVBQ2IsS0FBSyxFQUFFLHFCQUFVLEVBQ2pCLE9BQU8sd0JBQ0EsK0JBQU0sQ0FBQyxPQUFPLEtBQ2pCLFVBQVUsa0NBQ0gsK0JBQU0sQ0FBQyxPQUFPLENBQUMsVUFBVTtZQUM1QixNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU87ZUFJL0IsTUFBTSx3QkFDQywrQkFBTSxDQUFDLE1BQU0sS0FDaEIsS0FBSyxFQUFFO1lBQ0gsbUJBQVc7WUFDWCxzQkFBYztZQUNkLDJCQUFtQjtZQUNuQixnQkFBUTtZQUNSLDRCQUFvQjtZQUNwQixzQkFBYztZQUNkLGlCQUFTO1lBQ1QsZ0JBQVE7WUFDUixnQkFBUTtTQUNYLEtBRUwsT0FBTyxrQ0FDQSwrQkFBTSxDQUFDLE9BQU87UUFDakIseUJBQWU7UUFDZix5QkFBZTtRQUNmLHVCQUFhO1VBRW5CO0FBRUYsa0JBQWUscUJBQWEsQ0FBQyJ9