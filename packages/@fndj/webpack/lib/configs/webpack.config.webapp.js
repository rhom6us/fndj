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
exports.configuration = void 0;
var path_1 = __importDefault(require("path"));
var plugins = __importStar(require("./plugins"));
var rules = __importStar(require("./rules"));
var settings_1 = require("./settings");
var webpack_config_common_1 = __importDefault(require("./webpack.config.common"));
exports.configuration = __assign(__assign({}, webpack_config_common_1.default), { entry: __spreadArray(__spreadArray([], (Array.isArray(webpack_config_common_1.default.entry) ? webpack_config_common_1.default.entry : [webpack_config_common_1.default.entry]), true), [
        "./node_modules/@fndj/core/src/web-audio/FnMeter/FnMeter.worklet.ts"
    ], false), target: 'web', mode: settings_1.isDev ? 'development' : 'production', 
    // entry: entryPoint,//path.join(projectDir, 'src/index.ts'),
    // entry: [
    //    // 'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    //    // 'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    //     entryPoint // Your appʼs entry point
    // ],
    resolve: __assign(__assign({}, webpack_config_common_1.default.resolve), { alias: __assign(__assign({}, webpack_config_common_1.default.resolve.alias), { '@fndj/browser': [path_1.default.join(__dirname, 'packages', '@fndj/browser'), path_1.default.join(webpack_config_common_1.default.context, 'src')] }), extensions: __spreadArray(__spreadArray([], webpack_config_common_1.default.resolve.extensions, true), [
            '.tsx', '.css', '.swcss', '.wasm', '.workletts'
        ], false), fallback: __assign({}, webpack_config_common_1.default.resolve.fallback) }), module: __assign(__assign({}, webpack_config_common_1.default.module), { rules: [
            rules.workletRule,
            // rules.workerRule,
            rules.wasmRule,
            rules.wavRule,
            rules.typescriptRule,
            rules.globalStylesheetRule,
            rules.stylesheetRule,
            rules.imageRule,
            rules.fontRule,
            rules.htmlRule,
        ] }), plugins: __spreadArray(__spreadArray([], webpack_config_common_1.default.plugins, true), [
        settings_1.isDev && plugins.hotModuleReplacement,
        settings_1.isDev && plugins.reachRefresh,
        plugins.createIndexHtml,
        plugins.extractCssFiles,
        plugins.cleanBuildDir,
    ], false).filter(Boolean), experiments: {
        topLevelAwait: true,
        asset: true,
    } });
exports.default = exports.configuration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcud2ViYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZ3Mvd2VicGFjay5jb25maWcud2ViYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF3QjtBQUV4QixpREFBcUM7QUFDckMsNkNBQWlDO0FBQ2pDLHVDQUFtQztBQUNuQyxrRkFBNkM7QUFhaEMsUUFBQSxhQUFhLHlCQUNuQiwrQkFBTSxLQUNULEtBQUssa0NBQ0UsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLCtCQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLCtCQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLCtCQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEUsb0VBQW9FO2VBRXhFLE1BQU0sRUFBRSxLQUFLLEVBQ2IsSUFBSSxFQUFFLGdCQUFLLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsWUFBWTtJQUMxQyw2REFBNkQ7SUFDN0QsV0FBVztJQUNYLDJGQUEyRjtJQUMzRixrRkFBa0Y7SUFDbEYsMkNBQTJDO0lBQzNDLEtBQUs7SUFDTCxPQUFPLHdCQUNBLCtCQUFNLENBQUMsT0FBTyxLQUNqQixLQUFLLHdCQUNFLCtCQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssS0FDdkIsZUFBZSxFQUFFLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLGVBQWUsQ0FBQyxFQUFFLGNBQUksQ0FBQyxJQUFJLENBQUMsK0JBQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsS0FFMUcsVUFBVSxrQ0FDSCwrQkFBTSxDQUFDLE9BQVEsQ0FBQyxVQUFVO1lBQzdCLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxZQUFZO21CQUVuRCxRQUFRLGVBQ0QsK0JBQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxNQUlsQyxNQUFNLHdCQUNDLCtCQUFNLENBQUMsTUFBTSxLQUNoQixLQUFLLEVBQUU7WUFDSCxLQUFLLENBQUMsV0FBVztZQUNqQixvQkFBb0I7WUFDcEIsS0FBSyxDQUFDLFFBQVE7WUFDZCxLQUFLLENBQUMsT0FBTztZQUNiLEtBQUssQ0FBQyxjQUFjO1lBQ3BCLEtBQUssQ0FBQyxvQkFBb0I7WUFDMUIsS0FBSyxDQUFDLGNBQWM7WUFDcEIsS0FBSyxDQUFDLFNBQVM7WUFDZixLQUFLLENBQUMsUUFBUTtZQUNkLEtBQUssQ0FBQyxRQUFRO1NBQ2pCLEtBRUwsT0FBTyxFQUFFLGdDQUNGLCtCQUFNLENBQUMsT0FBTztRQUVqQixnQkFBSyxJQUFJLE9BQU8sQ0FBQyxvQkFBb0I7UUFDckMsZ0JBQUssSUFBSSxPQUFPLENBQUMsWUFBWTtRQUM3QixPQUFPLENBQUMsZUFBZTtRQUN2QixPQUFPLENBQUMsZUFBZTtRQUN2QixPQUFPLENBQUMsYUFBYTtjQUV2QixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQ2pCLFdBQVcsRUFBRTtRQUNULGFBQWEsRUFBRSxJQUFJO1FBQ25CLEtBQUssRUFBRSxJQUFJO0tBQ2QsSUFHSDtBQUdGLGtCQUFlLHFCQUFhLENBQUMifQ==