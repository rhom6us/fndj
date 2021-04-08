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
Object.defineProperty(exports, "__esModule", { value: true });
var plugins = __importStar(require("./plugins"));
var settings_1 = require("./settings");
exports.default = {
    devtool: "source-map",
    context: settings_1.projectDir,
    entry: settings_1.entryPoint,
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
            'react-dom': '@hot-loader/react-dom',
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
        plugins.webpackBar,
        plugins.tsChecker,
        // plugins.cleanBuildDir,
        // plugins.defineStaticDirConst,
        // plugins.defineNodeEnvConst,
    ],
    module: {
        rules: [],
    },
}; // as webpack.Configuration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcuY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZ3Mvd2VicGFjay5jb25maWcuY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGlEQUFxQztBQUNyQyx1Q0FBbUU7QUFFbkUsa0JBQWU7SUFDYixPQUFPLEVBQUUsWUFBWTtJQUNyQixPQUFPLEVBQUUscUJBQVU7SUFDbkIsS0FBSyxFQUFFLHFCQUFVO0lBQ2pCLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxpQkFBTTtRQUNaLFFBQVEsRUFBRSxZQUFTLGdCQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLFNBQUs7UUFDckQsYUFBYSxFQUFFLFlBQVMsZ0JBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsU0FBSztLQUMzRDtJQUNELEtBQUssRUFBRTtRQUNMLFFBQVEsRUFBRSxLQUFLO1FBQ2YsY0FBYyxFQUFFLDRCQUE0QjtLQUM3QztJQUNELE9BQU8sRUFBRTtRQUNQLEtBQUssRUFBRTtZQUNMLHdDQUF3QztZQUN4Qyx3Q0FBd0M7WUFDeEMsZ0RBQWdEO1lBQ2hELDRDQUE0QztZQUM1Qyx5Q0FBeUM7WUFDekMsV0FBVyxFQUFFLHVCQUF1QjtTQUNyQztRQUNELFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQztLQUM3QztJQUNELFVBQVU7SUFDVixxQkFBcUI7SUFDckIsc0JBQXNCO0lBQ3RCLEtBQUs7SUFDTCxrQkFBa0I7SUFDbEIsbUNBQW1DO0lBQ25DLHdCQUF3QjtJQUN4QiwwQkFBMEI7SUFDMUIsNEJBQTRCO0lBQzVCLCtCQUErQjtJQUMvQixzQkFBc0I7SUFDdEIsd0JBQXdCO0lBQ3hCLHFCQUFxQjtJQUNyQiw2Q0FBNkM7SUFDN0MsNkJBQTZCO0lBQzdCLDRCQUE0QjtJQUM1QixjQUFjO0lBQ2QsWUFBWTtJQUNaLFVBQVU7SUFDVixLQUFLO0lBQ0wsT0FBTyxFQUFFO1FBQ1AsT0FBTyxDQUFDLFVBQVU7UUFDbEIsT0FBTyxDQUFDLFNBQVM7UUFDakIseUJBQXlCO1FBQ3pCLGdDQUFnQztRQUNoQyw4QkFBOEI7S0FDL0I7SUFDRCxNQUFNLEVBQUU7UUFDTixLQUFLLEVBQUUsRUFDTjtLQUNGO0NBQ0YsQ0FBQyxDQUFBLDRCQUE0QiJ9