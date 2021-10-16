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
        warnings: false,
        warningsFilter: /export .* was not found in/,
    },
    resolve: {
        fallback: {
            // crypto: false /*require.resolve('crypto-browserify')*/,
            // path: false /*require.resolve('path-browserify')*/,
            // os: false /*require.resolve('os-browserify/browser')*/,
            // http: false /*require.resolve('stream-http')*/,
            // stream: false /*require.resolve('stream-browserify')*/,
            // zlib: false /*require.resolve('zlib-browserify')*/,
            // util: false /*require.resolve('util/')*/,
            child_process: false,
            http2: require.resolve('spdy-or-http2'),
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
        plugins.nodePolyfill,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcuY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZ3Mvd2VicGFjay5jb25maWcuY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhDQUF3QjtBQUV4QixpREFBcUM7QUFDckMsdUNBQW1FO0FBQ25FLGtCQUFlO0lBQ2IsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixPQUFPLEVBQUUscUJBQVU7SUFDbkIsS0FBSyxFQUFFLGNBQUksQ0FBQyxJQUFJLENBQUMscUJBQVUsRUFBRSxxQkFBVSxDQUFDO0lBQ3hDLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxpQkFBTTtRQUNaLFFBQVEsRUFBRSxZQUFTLGdCQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLFNBQUs7UUFDckQsYUFBYSxFQUFFLFlBQVMsZ0JBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsU0FBSztLQUMzRDtJQUNELEtBQUssRUFBRTtRQUNMLFFBQVEsRUFBRSxLQUFLO1FBQ2YsY0FBYyxFQUFFLDRCQUE0QjtLQUM3QztJQUNELE9BQU8sRUFBRTtRQUNQLFFBQVEsRUFBRTtZQUNSLDBEQUEwRDtZQUMxRCxzREFBc0Q7WUFDdEQsMERBQTBEO1lBQzFELGtEQUFrRDtZQUNsRCwwREFBMEQ7WUFDMUQsc0RBQXNEO1lBQ3RELDRDQUE0QztZQUM1QyxhQUFhLEVBQUUsS0FBSztZQUNwQixLQUFLLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUM7WUFFdkMsR0FBRyxFQUFFLEtBQUssQ0FBQyxpQ0FBaUM7WUFDNUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxxQ0FBcUM7WUFDaEQsR0FBRyxFQUFFLEtBQUssQ0FBQyw0QkFBNEI7WUFDdkMsRUFBRSxFQUFFLEtBQUssQ0FBQyw0QkFBNEI7U0FFdkM7UUFDRCxLQUFLLEVBQUU7UUFDTCx3Q0FBd0M7UUFDeEMsd0NBQXdDO1FBQ3hDLGdEQUFnRDtRQUNoRCw0Q0FBNEM7UUFDNUMseUNBQXlDO1FBQ3pDLHdDQUF3QztTQUN6QztRQUNELFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQztLQUM3QztJQUNELFVBQVU7SUFDVixxQkFBcUI7SUFDckIsc0JBQXNCO0lBQ3RCLEtBQUs7SUFDTCxrQkFBa0I7SUFDbEIsbUNBQW1DO0lBQ25DLHdCQUF3QjtJQUN4QiwwQkFBMEI7SUFDMUIsNEJBQTRCO0lBQzVCLCtCQUErQjtJQUMvQixzQkFBc0I7SUFDdEIsd0JBQXdCO0lBQ3hCLHFCQUFxQjtJQUNyQiw2Q0FBNkM7SUFDN0MsNkJBQTZCO0lBQzdCLDRCQUE0QjtJQUM1QixjQUFjO0lBQ2QsWUFBWTtJQUNaLFVBQVU7SUFDVixLQUFLO0lBQ0wsT0FBTyxFQUFFO1FBQ1AsT0FBTyxDQUFDLFlBQVk7UUFDcEIsZ0JBQUssSUFBSSxPQUFPLENBQUMsVUFBVTtRQUMzQixPQUFPLENBQUMsU0FBUztRQUNqQix5QkFBeUI7UUFDekIsZ0NBQWdDO1FBQ2hDLDhCQUE4QjtLQUMvQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDakIsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFLEVBQ047S0FDRjtDQUNGLENBQUMsQ0FBQSw0QkFBNEIifQ==