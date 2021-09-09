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
var rules_1 = require("./rules");
var webpack_config_common_1 = __importDefault(require("./webpack.config.common"));
exports.default = __assign(__assign({}, webpack_config_common_1.default), { target: 'electron-main', stats: {
        warningsFilter: [/Can't resolve '(utf-8-validate|bufferutil)'/i, /export .* was not found in/i],
    }, module: __assign(__assign({}, webpack_config_common_1.default.module), { rules: __spreadArray([rules_1.typescriptRule, rules_1.workletRule], webpack_config_common_1.default.module.rules, true) }) });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcubWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWdzL3dlYnBhY2suY29uZmlnLm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGlDQUFzRDtBQUN0RCxrRkFBNkM7QUFFN0Msa0JBQWUsc0JBQ1YsK0JBQU0sS0FDVCxNQUFNLEVBQUUsZUFBZSxFQUN2QixLQUFLLEVBQUU7UUFDTCxjQUFjLEVBQUUsQ0FBQyw4Q0FBOEMsRUFBRSw2QkFBNkIsQ0FBQztLQUNoRyxFQUNELE1BQU0sd0JBQ0QsK0JBQU0sQ0FBQyxNQUFNLEtBQ2hCLEtBQUssaUJBQUcsc0JBQWMsRUFBRSxtQkFBVyxHQUFLLCtCQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssYUFFckMsQ0FBQyJ9