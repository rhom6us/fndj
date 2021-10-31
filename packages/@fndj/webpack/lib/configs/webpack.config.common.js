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
        // chunkFilename: `[name]${isDev ? '' : '.[contenthash]'}.js`,
        //  devtoolModuleFilenameTemplate: 'ala:///[resource-path]?[loaders]',
        // devtoolModuleFilenameTemplate: (info: Record<'absoluteResourcePath'|'allLoaders'|'hash'|'id'|'loaders'|'resource'|'resourcePath'|'namespace', string>) => {
        //   const result = `alla://@fndj/${path.relative(rootDir, path.resolve(info.absoluteResourcePath).replace(/\\/g, "/"))}`;
        //   console.log(result);
        // }
        // devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, "/"),
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
    experiments: {
        topLevelAwait: true,
        asset: true,
    }
}; // as webpack.Configuration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcuY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZ3Mvd2VicGFjay5jb25maWcuY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhDQUF3QjtBQUN4QixpREFBcUM7QUFDckMsdUNBQW1FO0FBQ25FLGtCQUFlO0lBQ2IsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixPQUFPLEVBQUUscUJBQVU7SUFDbkIsS0FBSyxFQUFFLGNBQUksQ0FBQyxJQUFJLENBQUMscUJBQVUsRUFBRSxxQkFBVSxDQUFDO0lBQ3hDLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxpQkFBTTtRQUNaLFFBQVEsRUFBRSxZQUFTLGdCQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLFNBQUs7UUFDckQsOERBQThEO1FBQzlELHNFQUFzRTtRQUN0RSw4SkFBOEo7UUFDOUosMEhBQTBIO1FBQzFILHlCQUF5QjtRQUN6QixJQUFJO1FBRUosc0dBQXNHO0tBRXZHO0lBQ0QsS0FBSyxFQUFFO0lBQ0wsbUJBQW1CO0lBQ25CLGdEQUFnRDtLQUNqRDtJQUNELE9BQU8sRUFBRTtRQUNQLFFBQVEsRUFBRTtZQUNSLEdBQUcsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUMzQixNQUFNLEVBQUUsS0FBSyxDQUFDLHdDQUF3QztZQUN0RCxJQUFJLEVBQUUsS0FBSyxDQUFDLHNDQUFzQztZQUNsRCxFQUFFLEVBQUUsS0FBSyxDQUFDLDRDQUE0QztZQUN0RCxJQUFJLEVBQUUsS0FBSyxDQUFDLGtDQUFrQztZQUM5QyxNQUFNLEVBQUUsS0FBSyxDQUFDLHdDQUF3QztZQUN0RCxJQUFJLEVBQUUsS0FBSyxDQUFDLHNDQUFzQztZQUNsRCxJQUFJLEVBQUUsS0FBSyxDQUFDLDRCQUE0QjtZQUN4QyxhQUFhLEVBQUUsS0FBSztZQUNwQixLQUFLLEVBQUUsS0FBSztZQUVaLEdBQUcsRUFBRSxLQUFLLENBQUMsaUNBQWlDO1lBQzVDLEdBQUcsRUFBRSxLQUFLLENBQUMscUNBQXFDO1lBQ2hELEdBQUcsRUFBRSxLQUFLLENBQUMsNEJBQTRCO1lBQ3ZDLEVBQUUsRUFBRSxLQUFLLENBQUMsNEJBQTRCO1NBRXZDO1FBQ0QsS0FBSyxFQUFFO1FBQ0wsd0NBQXdDO1FBQ3hDLHdDQUF3QztRQUN4QyxnREFBZ0Q7UUFDaEQsNENBQTRDO1FBQzVDLHlDQUF5QztTQUMxQztRQUNELFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDO0tBQ3BDO0lBQ0QsVUFBVTtJQUNWLHFCQUFxQjtJQUNyQixzQkFBc0I7SUFDdEIsS0FBSztJQUNMLGtCQUFrQjtJQUNsQixtQ0FBbUM7SUFDbkMsd0JBQXdCO0lBQ3hCLDBCQUEwQjtJQUMxQiw0QkFBNEI7SUFDNUIsK0JBQStCO0lBQy9CLHNCQUFzQjtJQUN0Qix3QkFBd0I7SUFDeEIscUJBQXFCO0lBQ3JCLDZDQUE2QztJQUM3Qyw2QkFBNkI7SUFDN0IsNEJBQTRCO0lBQzVCLGNBQWM7SUFDZCxZQUFZO0lBQ1osVUFBVTtJQUNWLEtBQUs7SUFDTCxPQUFPLEVBQUU7UUFDUCx3QkFBd0I7UUFDeEIsK0JBQStCO1FBQy9CLE9BQU8sQ0FBQyxTQUFTO1FBQ2pCLHlCQUF5QjtRQUN6QixnQ0FBZ0M7UUFDaEMsOEJBQThCO0tBQy9CLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNqQixNQUFNLEVBQUU7UUFDTixLQUFLLEVBQUUsRUFDTjtLQUNGO0lBQ0QsV0FBVyxFQUFFO1FBQ1gsYUFBYSxFQUFFLElBQUk7UUFDbkIsS0FBSyxFQUFFLElBQUk7S0FDWjtDQUNGLENBQUMsQ0FBQSw0QkFBNEIifQ==