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
    devtool: 'eval-source-map',
    context: settings_1.projectDir,
    entry: path_1.default.join(settings_1.projectDir, settings_1.entryPoint),
    output: {
        path: settings_1.outDir,
        filename: "[name]" + (settings_1.isDev ? '' : '.[contenthash]') + ".js",
        chunkFilename: "[name]" + (settings_1.isDev ? '' : '.[contenthash]') + ".js",
    },
    stats: {
    // warnings: false,
    // warningsFilter: /export .* was not found in/,
    },
    resolve: {
        fallback: {
            url: require.resolve('url'),
            crypto: false /*require.resolve('crypto-browserify')*/,
            path: false /*require.resolve('path-browserify')*/,
            os: false /*require.resolve('os-browserify/browser')*/,
            http: false /*require.resolve('stream-http')*/,
            stream: false /*require.resolve('stream-browserify')*/,
            zlib: false /*require.resolve('zlib-browserify')*/,
            util: false /*require.resolve('util/')*/,
            child_process: false,
            http2: false,
            dns: false /*require.resolve('chrome-dns')*/,
            net: false /*require.resolve('net-browserify')*/,
            tls: false /*require.resolve('util/')*/,
            fs: false /*require.resolve('util/')*/,
        },
        alias: {
        // '@': path.resolve(rendererSourceDir),
        // '~main': path.resolve(mainSourceDir),
        // '~renderer': path.resolve(rendererSourceDir),
        // '~common': path.resolve(commonSourceDir),
        // common: path.resolve(commonSourceDir),
        },
        extensions: ['.js', '.ts', '.json'],
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
        // plugins.nodePolyfill,
        // isDev && plugins.webpackBar,
        plugins.tsChecker,
        // plugins.cleanBuildDir,
        // plugins.defineStaticDirConst,
        // plugins.defineNodeEnvConst,
    ].filter(Boolean),
    module: {
        rules: [],
    },
}; // as webpack.Configuration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcuY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZ3Mvd2VicGFjay5jb25maWcuY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhDQUF3QjtBQUN4QixpREFBcUM7QUFDckMsdUNBQW1FO0FBQ25FLGtCQUFlO0lBQ2IsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixPQUFPLEVBQUUscUJBQVU7SUFDbkIsS0FBSyxFQUFFLGNBQUksQ0FBQyxJQUFJLENBQUMscUJBQVUsRUFBRSxxQkFBVSxDQUFDO0lBQ3hDLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxpQkFBTTtRQUNaLFFBQVEsRUFBRSxZQUFTLGdCQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLFNBQUs7UUFDckQsYUFBYSxFQUFFLFlBQVMsZ0JBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsU0FBSztLQUMzRDtJQUNELEtBQUssRUFBRTtJQUNMLG1CQUFtQjtJQUNuQixnREFBZ0Q7S0FDakQ7SUFDRCxPQUFPLEVBQUU7UUFDUCxRQUFRLEVBQUU7WUFDUixHQUFHLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDM0IsTUFBTSxFQUFFLEtBQUssQ0FBQyx3Q0FBd0M7WUFDdEQsSUFBSSxFQUFFLEtBQUssQ0FBQyxzQ0FBc0M7WUFDbEQsRUFBRSxFQUFFLEtBQUssQ0FBQyw0Q0FBNEM7WUFDdEQsSUFBSSxFQUFFLEtBQUssQ0FBQyxrQ0FBa0M7WUFDOUMsTUFBTSxFQUFFLEtBQUssQ0FBQyx3Q0FBd0M7WUFDdEQsSUFBSSxFQUFFLEtBQUssQ0FBQyxzQ0FBc0M7WUFDbEQsSUFBSSxFQUFFLEtBQUssQ0FBQyw0QkFBNEI7WUFDeEMsYUFBYSxFQUFFLEtBQUs7WUFDcEIsS0FBSyxFQUFFLEtBQUs7WUFFWixHQUFHLEVBQUUsS0FBSyxDQUFDLGlDQUFpQztZQUM1QyxHQUFHLEVBQUUsS0FBSyxDQUFDLHFDQUFxQztZQUNoRCxHQUFHLEVBQUUsS0FBSyxDQUFDLDRCQUE0QjtZQUN2QyxFQUFFLEVBQUUsS0FBSyxDQUFDLDRCQUE0QjtTQUV2QztRQUNELEtBQUssRUFBRTtRQUNMLHdDQUF3QztRQUN4Qyx3Q0FBd0M7UUFDeEMsZ0RBQWdEO1FBQ2hELDRDQUE0QztRQUM1Qyx5Q0FBeUM7U0FDMUM7UUFDRCxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQztLQUNwQztJQUNELFVBQVU7SUFDVixxQkFBcUI7SUFDckIsc0JBQXNCO0lBQ3RCLEtBQUs7SUFDTCxrQkFBa0I7SUFDbEIsbUNBQW1DO0lBQ25DLHdCQUF3QjtJQUN4QiwwQkFBMEI7SUFDMUIsNEJBQTRCO0lBQzVCLCtCQUErQjtJQUMvQixzQkFBc0I7SUFDdEIsd0JBQXdCO0lBQ3hCLHFCQUFxQjtJQUNyQiw2Q0FBNkM7SUFDN0MsNkJBQTZCO0lBQzdCLDRCQUE0QjtJQUM1QixjQUFjO0lBQ2QsWUFBWTtJQUNaLFVBQVU7SUFDVixLQUFLO0lBQ0wsT0FBTyxFQUFFO1FBQ1Asd0JBQXdCO1FBQ3hCLCtCQUErQjtRQUMvQixPQUFPLENBQUMsU0FBUztRQUNqQix5QkFBeUI7UUFDekIsZ0NBQWdDO1FBQ2hDLDhCQUE4QjtLQUMvQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDakIsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFLEVBQ047S0FDRjtDQUNGLENBQUMsQ0FBQSw0QkFBNEIifQ==