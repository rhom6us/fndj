"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var plugins_1 = require("./plugins");
var settings_1 = require("./settings");
exports.default = {
    devtool: "source-map",
    context: settings_1.projectDir,
    entry: path_1.default.join(settings_1.projectDir, 'index.ts'),
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
    plugins: __spreadArray([], plugins_1.devPlugins),
    module: {
        rules: [],
    },
}; // as webpack.Configuration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcuY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZ3Mvd2VicGFjay5jb25maWcuY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSw4Q0FBd0I7QUFFeEIscUNBQTJEO0FBQzNELHVDQUF1RDtBQUV2RCxrQkFBZTtJQUNiLE9BQU8sRUFBRSxZQUFZO0lBQ3JCLE9BQU8sRUFBRSxxQkFBVTtJQUNuQixLQUFLLEVBQUUsY0FBSSxDQUFDLElBQUksQ0FBQyxxQkFBVSxFQUFFLFVBQVUsQ0FBQztJQUN4QyxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsaUJBQU07UUFDWixRQUFRLEVBQUUsWUFBUyxnQkFBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixTQUFLO1FBQ3JELGFBQWEsRUFBRSxZQUFTLGdCQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLFNBQUs7S0FDM0Q7SUFDRCxLQUFLLEVBQUU7UUFDTCxRQUFRLEVBQUUsS0FBSztRQUNmLGNBQWMsRUFBRSw0QkFBNEI7S0FDN0M7SUFDRCxPQUFPLEVBQUU7UUFDUCxLQUFLLEVBQUU7WUFDTCx3Q0FBd0M7WUFDeEMsd0NBQXdDO1lBQ3hDLGdEQUFnRDtZQUNoRCw0Q0FBNEM7WUFDNUMseUNBQXlDO1lBQ3pDLFdBQVcsRUFBRSx1QkFBdUI7U0FDckM7UUFDRCxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7S0FDN0M7SUFDRCxVQUFVO0lBQ1YscUJBQXFCO0lBQ3JCLHNCQUFzQjtJQUN0QixLQUFLO0lBQ0wsa0JBQWtCO0lBQ2xCLG1DQUFtQztJQUNuQyx3QkFBd0I7SUFDeEIsMEJBQTBCO0lBQzFCLDRCQUE0QjtJQUM1QiwrQkFBK0I7SUFDL0Isc0JBQXNCO0lBQ3RCLHdCQUF3QjtJQUN4QixxQkFBcUI7SUFDckIsNkNBQTZDO0lBQzdDLDZCQUE2QjtJQUM3Qiw0QkFBNEI7SUFDNUIsY0FBYztJQUNkLFlBQVk7SUFDWixVQUFVO0lBQ1YsS0FBSztJQUNMLE9BQU8sb0JBQ0Ysb0JBQVUsQ0FJZDtJQUNELE1BQU0sRUFBRTtRQUNOLEtBQUssRUFBRSxFQUNOO0tBQ0Y7Q0FDRixDQUFDLENBQUEsNEJBQTRCIn0=