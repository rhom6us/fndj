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
var webpack_config_common_1 = __importDefault(require("./webpack.config.common"));
exports.configuration = __assign(__assign({}, webpack_config_common_1.default), { target: 'web', mode: 'development', 
    // entry: entryPoint,//path.join(projectDir, 'src/index.ts'),
    // entry: [
    //    // 'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    //    // 'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    //     entryPoint // Your appʼs entry point
    // ],
    resolve: __assign(__assign({}, webpack_config_common_1.default.resolve), { extensions: __spreadArray(__spreadArray([], webpack_config_common_1.default.resolve.extensions), [
            '.tsx', '.css', '.scss'
        ]) }), module: __assign(__assign({}, webpack_config_common_1.default.module), { rules: [
            rules_1.workletRule,
            rules_1.reactTypescriptRule,
            rules_1.typescriptRule,
            // nodeRule,
            rules_1.globalStylesheetRule,
            rules_1.stylesheetRule,
            rules_1.imageRule,
            rules_1.fontRule,
            rules_1.htmlRule,
        ] }), plugins: __spreadArray(__spreadArray([], webpack_config_common_1.default.plugins), [
        plugins_1.createIndexHtml,
        plugins_1.extractCssFiles,
        plugins_1.cleanBuildDir,
    ]), experiments: {
        topLevelAwait: true
    } });
exports.default = exports.configuration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcud2ViYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZ3Mvd2VicGFjay5jb25maWcud2ViYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxxQ0FBa0c7QUFDbEcsaUNBR2lCO0FBRWpCLGtGQUE2QztBQVdoQyxRQUFBLGFBQWEseUJBQ25CLCtCQUFNLEtBQ1QsTUFBTSxFQUFFLEtBQUssRUFDYixJQUFJLEVBQUUsYUFBYTtJQUNuQiw2REFBNkQ7SUFDN0QsV0FBVztJQUNYLDJGQUEyRjtJQUMzRixrRkFBa0Y7SUFDbEYsMkNBQTJDO0lBQzNDLEtBQUs7SUFDTCxPQUFPLHdCQUNBLCtCQUFNLENBQUMsT0FBTyxLQUNqQixVQUFVLGtDQUNILCtCQUFNLENBQUMsT0FBUSxDQUFDLFVBQVU7WUFDN0IsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPO2VBSS9CLE1BQU0sd0JBQ0MsK0JBQU0sQ0FBQyxNQUFNLEtBQ2hCLEtBQUssRUFBRTtZQUNILG1CQUFXO1lBQ1gsMkJBQW1CO1lBQ25CLHNCQUFjO1lBQ2QsWUFBWTtZQUNaLDRCQUFvQjtZQUNwQixzQkFBYztZQUNkLGlCQUFTO1lBQ1QsZ0JBQVE7WUFDUixnQkFBUTtTQUNYLEtBRUwsT0FBTyxrQ0FDQSwrQkFBTSxDQUFDLE9BQU87UUFDakIseUJBQWU7UUFDZix5QkFBZTtRQUNmLHVCQUFhO1FBR2pCLFdBQVcsRUFBRTtRQUNULGFBQWEsRUFBRSxJQUFJO0tBQ3RCLElBR0g7QUFHRixrQkFBZSxxQkFBYSxDQUFDIn0=