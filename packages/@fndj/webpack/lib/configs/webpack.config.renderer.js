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
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var plugins_1 = require("./plugins");
var rules_1 = require("./rules");
var webpack_config_common_1 = __importDefault(require("./webpack.config.common"));
exports.default = __assign(__assign({}, webpack_config_common_1.default), { target: 'electron-renderer', resolve: __assign(__assign({}, webpack_config_common_1.default.resolve), { extensions: __spreadArray(__spreadArray([], webpack_config_common_1.default.resolve.extensions), ['.tsx', '.css', '.scss']) }), module: __assign(__assign({}, webpack_config_common_1.default.module), { rules: __spreadArray(__spreadArray([], webpack_config_common_1.default.module.rules), [rules_1.reactTypescriptRule, rules_1.nodeRule, rules_1.globalStylesheetRule, rules_1.stylesheetRule, rules_1.imageRule, rules_1.fontRule, rules_1.htmlRule, rules_1.workletRule]) }), plugins: __spreadArray(__spreadArray([], webpack_config_common_1.default.plugins), [
        plugins_1.createIndexHtml,
        mini_css_extract_plugin_1.default
    ]) });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcucmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlncy93ZWJwYWNrLmNvbmZpZy5yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxvRkFBMkQ7QUFFM0QscUNBQTRDO0FBQzVDLGlDQUdpQjtBQUNqQixrRkFBNkM7QUFFN0Msa0JBQWUsc0JBQ1YsK0JBQU0sS0FDVCxNQUFNLEVBQUUsbUJBQW1CLEVBQzNCLE9BQU8sd0JBQ0YsK0JBQU0sQ0FBQyxPQUFPLEtBQ2pCLFVBQVUsa0NBQU0sK0JBQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxPQUVwRSxNQUFNLHdCQUNELCtCQUFNLENBQUMsTUFBTSxLQUNoQixLQUFLLGtDQUFNLCtCQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBRSwyQkFBbUIsRUFBRSxnQkFBUSxFQUFFLDRCQUFvQixFQUFFLHNCQUFjLEVBQUUsaUJBQVMsRUFBRSxnQkFBUSxFQUFFLGdCQUFRLEVBQUUsbUJBQVcsT0FFakosT0FBTyxrQ0FDRiwrQkFBTSxDQUFDLE9BQU87UUFDakIseUJBQWU7UUFDZixpQ0FBb0I7U0FFRSxDQUFDIn0=