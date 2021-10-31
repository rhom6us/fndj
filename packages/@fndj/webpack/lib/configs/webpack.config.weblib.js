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
var loaders_1 = require("./loaders");
var plugins = __importStar(require("./plugins"));
var rules = __importStar(require("./rules"));
var settings_1 = require("./settings");
var webpack_config_common_1 = __importDefault(require("./webpack.config.common"));
exports.configuration = __assign(__assign({}, webpack_config_common_1.default), { output: __assign(__assign({}, webpack_config_common_1.default.output), { filename: '[name].js', library: {
            name: '[name]',
            type: 'umd'
        } }), 
    /**
     * PEER DEPENDANCIES
     */
    externals: {
        react: 'react',
    }, 
    /**
     * Webpack will generate code like import * as X from '...' for externals used in a module.
     */
    externalsType: 'module', target: 'web', mode: settings_1.isDev ? 'development' : 'production', 
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
        ] }), plugins: __spreadArray(__spreadArray([], (0, loaders_1.onlyif)(settings_1.isDev, plugins.webpackBar, plugins.reachRefresh, plugins.tsChecker, plugins.tsCheckerNotifier), true), [
        // isDev && plugins.hotModuleReplacement,
        plugins.createIndexHtml,
        plugins.extractCssFiles,
    ], false), experiments: __assign(__assign({}, webpack_config_common_1.default.experiments), { outputModue: true }) });
exports.default = exports.configuration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcud2VibGliLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZ3Mvd2VicGFjay5jb25maWcud2VibGliLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF3QjtBQUV4QixxQ0FBbUM7QUFDbkMsaURBQXFDO0FBQ3JDLDZDQUFpQztBQUNqQyx1Q0FBbUM7QUFDbkMsa0ZBQTZDO0FBYWhDLFFBQUEsYUFBYSx5QkFDbkIsK0JBQU0sS0FDVCxNQUFNLHdCQUNDLCtCQUFNLENBQUMsTUFBTSxLQUNoQixRQUFRLEVBQUUsV0FBVyxFQUNyQixPQUFPLEVBQUU7WUFDTCxJQUFJLEVBQUMsUUFBUTtZQUNiLElBQUksRUFBRSxLQUFLO1NBQ2Q7SUFFTDs7T0FFRztJQUNILFNBQVMsRUFBQztRQUNOLEtBQUssRUFBRSxPQUFPO0tBQ2pCO0lBQ0Q7O09BRUc7SUFDSCxhQUFhLEVBQUMsUUFBUSxFQUd0QixNQUFNLEVBQUUsS0FBSyxFQUNiLElBQUksRUFBRSxnQkFBSyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFlBQVk7SUFDMUMsNkRBQTZEO0lBQzdELFdBQVc7SUFDWCwyRkFBMkY7SUFDM0Ysa0ZBQWtGO0lBQ2xGLDJDQUEyQztJQUMzQyxLQUFLO0lBQ0wsT0FBTyx3QkFDQSwrQkFBTSxDQUFDLE9BQU8sS0FDakIsS0FBSyx3QkFDRSwrQkFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQ3ZCLGVBQWUsRUFBRSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxlQUFlLENBQUMsRUFBRSxjQUFJLENBQUMsSUFBSSxDQUFDLCtCQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLEtBRTFHLFVBQVUsa0NBQ0gsK0JBQU0sQ0FBQyxPQUFRLENBQUMsVUFBVTtZQUM3QixNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsWUFBWTttQkFFbkQsUUFBUSxlQUNELCtCQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsTUFJbEMsTUFBTSx3QkFDQywrQkFBTSxDQUFDLE1BQU0sS0FDaEIsS0FBSyxFQUFFO1lBQ0gsS0FBSyxDQUFDLFdBQVc7WUFDakIsb0JBQW9CO1lBQ3BCLEtBQUssQ0FBQyxRQUFRO1lBQ2QsS0FBSyxDQUFDLE9BQU87WUFDYixLQUFLLENBQUMsY0FBYztZQUNwQixLQUFLLENBQUMsb0JBQW9CO1lBQzFCLEtBQUssQ0FBQyxjQUFjO1lBQ3BCLEtBQUssQ0FBQyxTQUFTO1lBQ2YsS0FBSyxDQUFDLFFBQVE7WUFDZCxLQUFLLENBQUMsUUFBUTtTQUNqQixLQUVMLE9BQU8sa0NBQ0EsSUFBQSxnQkFBTSxFQUFDLGdCQUFLLEVBQ1gsT0FBTyxDQUFDLFVBQVUsRUFDbEIsT0FBTyxDQUFDLFlBQVksRUFDcEIsT0FBTyxDQUFDLFNBQVMsRUFDakIsT0FBTyxDQUFDLGlCQUFpQixDQUM1QjtRQUVELHlDQUF5QztRQUN6QyxPQUFPLENBQUMsZUFBZTtRQUN2QixPQUFPLENBQUMsZUFBZTtlQUkzQixXQUFXLHdCQUNKLCtCQUFNLENBQUMsV0FBVyxLQUNyQixXQUFXLEVBQUUsSUFBSSxPQUd2QjtBQUdGLGtCQUFlLHFCQUFhLENBQUMifQ==