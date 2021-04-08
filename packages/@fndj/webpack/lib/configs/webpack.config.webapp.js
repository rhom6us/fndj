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
var plugins = __importStar(require("./plugins"));
var rules = __importStar(require("./rules"));
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
            rules.workletRule,
            rules.reactTypescriptRule,
            rules.typescriptRule,
            // nodeRule,
            rules.globalStylesheetRule,
            rules.stylesheetRule,
            rules.imageRule,
            rules.fontRule,
            rules.htmlRule,
        ] }), plugins: __spreadArray(__spreadArray([], webpack_config_common_1.default.plugins), [
        plugins.createIndexHtml,
        plugins.extractCssFiles,
        plugins.cleanBuildDir,
    ]), experiments: {
        topLevelAwait: true
    } });
exports.default = exports.configuration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcud2ViYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZ3Mvd2VicGFjay5jb25maWcud2ViYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsaURBQXFDO0FBQ3JDLDZDQUFpQztBQUVqQyxrRkFBNkM7QUFXaEMsUUFBQSxhQUFhLHlCQUNuQiwrQkFBTSxLQUNULE1BQU0sRUFBRSxLQUFLLEVBQ2IsSUFBSSxFQUFFLGFBQWE7SUFDbkIsNkRBQTZEO0lBQzdELFdBQVc7SUFDWCwyRkFBMkY7SUFDM0Ysa0ZBQWtGO0lBQ2xGLDJDQUEyQztJQUMzQyxLQUFLO0lBQ0wsT0FBTyx3QkFDQSwrQkFBTSxDQUFDLE9BQU8sS0FDakIsVUFBVSxrQ0FDSCwrQkFBTSxDQUFDLE9BQVEsQ0FBQyxVQUFVO1lBQzdCLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTztlQUkvQixNQUFNLHdCQUNDLCtCQUFNLENBQUMsTUFBTSxLQUNoQixLQUFLLEVBQUU7WUFDSCxLQUFLLENBQUMsV0FBVztZQUNqQixLQUFLLENBQUMsbUJBQW1CO1lBQ3pCLEtBQUssQ0FBQyxjQUFjO1lBQ3BCLFlBQVk7WUFDWixLQUFLLENBQUMsb0JBQW9CO1lBQzFCLEtBQUssQ0FBQyxjQUFjO1lBQ3BCLEtBQUssQ0FBQyxTQUFTO1lBQ2YsS0FBSyxDQUFDLFFBQVE7WUFDZCxLQUFLLENBQUMsUUFBUTtTQUNqQixLQUVMLE9BQU8sa0NBQ0EsK0JBQU0sQ0FBQyxPQUFPO1FBQ2pCLE9BQU8sQ0FBQyxlQUFlO1FBQ3ZCLE9BQU8sQ0FBQyxlQUFlO1FBQ3ZCLE9BQU8sQ0FBQyxhQUFhO1FBR3pCLFdBQVcsRUFBRTtRQUNULGFBQWEsRUFBRSxJQUFJO0tBQ3RCLElBR0g7QUFHRixrQkFBZSxxQkFBYSxDQUFDIn0=