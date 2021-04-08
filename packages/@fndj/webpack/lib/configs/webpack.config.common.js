"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var plugins = __importStar(require("./plugins"));
var settings_1 = require("./settings");
exports.default = {
    devtool: "source-map",
    context: settings_1.projectDir,
    entry: path_1.default.join(settings_1.projectDir, settings_1.entryPoint),
    output: {
        path: settings_1.outDir,
        filename: "[name]" + (settings_1.isDev ? '' : '.[contenthash]') + ".js",
        chunkFilename: "[name]" + (settings_1.isDev ? '' : '.[contenthash]') + ".js",
    },
    stats: {
        warnings: false,
        warningsFilter: /export .* was not found in/,
    },
    resolve: {
        alias: {
        // '@': path.resolve(rendererSourceDir),
        // '~main': path.resolve(mainSourceDir),
        // '~renderer': path.resolve(rendererSourceDir),
        // '~common': path.resolve(commonSourceDir),
        // common: path.resolve(commonSourceDir),
        // 'react-dom': '@hot-loader/react-dom',
        },
        extensions: ['.js', '.ts', '.json', '.node'],
    },
    // node: {
    //   __dirname: true,
    //   __filename: true,
    // },
    // optimization: {
    //   nodeEnv: process.env.NODE_ENV,
    //   namedModules: true,
    //   noEmitOnErrors: true,
    //   // moduleIds: 'hashed',
    //   // runtimeChunk: 'single',
    //   // splitChunks: {
    //   //   cacheGroups: {
    //   //     vendor: {
    //   //       test: /[\\/]node_modules[\\/]/,
    //   //       name: 'vendor',
    //   //       chunks: 'all',
    //   //     },
    //   //   },
    //   // },
    // },
    plugins: [
        settings_1.isDev && plugins.webpackBar,
        plugins.tsChecker,
        // plugins.cleanBuildDir,
        // plugins.defineStaticDirConst,
        // plugins.defineNodeEnvConst,
    ].filter(Boolean),
    module: {
        rules: [],
    },
}; // as webpack.Configuration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcuY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZ3Mvd2VicGFjay5jb25maWcuY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhDQUF3QjtBQUV4QixpREFBcUM7QUFDckMsdUNBQW1FO0FBRW5FLGtCQUFlO0lBQ2IsT0FBTyxFQUFFLFlBQVk7SUFDckIsT0FBTyxFQUFFLHFCQUFVO0lBQ25CLEtBQUssRUFBRSxjQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFVLEVBQUUscUJBQVUsQ0FBQztJQUN4QyxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsaUJBQU07UUFDWixRQUFRLEVBQUUsWUFBUyxnQkFBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixTQUFLO1FBQ3JELGFBQWEsRUFBRSxZQUFTLGdCQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLFNBQUs7S0FDM0Q7SUFDRCxLQUFLLEVBQUU7UUFDTCxRQUFRLEVBQUUsS0FBSztRQUNmLGNBQWMsRUFBRSw0QkFBNEI7S0FDN0M7SUFDRCxPQUFPLEVBQUU7UUFDUCxLQUFLLEVBQUU7UUFDTCx3Q0FBd0M7UUFDeEMsd0NBQXdDO1FBQ3hDLGdEQUFnRDtRQUNoRCw0Q0FBNEM7UUFDNUMseUNBQXlDO1FBQ3pDLHdDQUF3QztTQUN6QztRQUNELFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQztLQUM3QztJQUNELFVBQVU7SUFDVixxQkFBcUI7SUFDckIsc0JBQXNCO0lBQ3RCLEtBQUs7SUFDTCxrQkFBa0I7SUFDbEIsbUNBQW1DO0lBQ25DLHdCQUF3QjtJQUN4QiwwQkFBMEI7SUFDMUIsNEJBQTRCO0lBQzVCLCtCQUErQjtJQUMvQixzQkFBc0I7SUFDdEIsd0JBQXdCO0lBQ3hCLHFCQUFxQjtJQUNyQiw2Q0FBNkM7SUFDN0MsNkJBQTZCO0lBQzdCLDRCQUE0QjtJQUM1QixjQUFjO0lBQ2QsWUFBWTtJQUNaLFVBQVU7SUFDVixLQUFLO0lBQ0wsT0FBTyxFQUFFO1FBQ1AsZ0JBQUssSUFBSSxPQUFPLENBQUMsVUFBVTtRQUMzQixPQUFPLENBQUMsU0FBUztRQUNqQix5QkFBeUI7UUFDekIsZ0NBQWdDO1FBQ2hDLDhCQUE4QjtLQUMvQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDakIsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFLEVBQ047S0FDRjtDQUNGLENBQUMsQ0FBQSw0QkFBNEIifQ==