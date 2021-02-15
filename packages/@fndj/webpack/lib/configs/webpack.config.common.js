"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var plugins_1 = require("./plugins");
var settings_1 = require("./settings");
exports.default = {
    devtool: settings_1.isDev ? 'cheap-module-eval-source-map' : undefined,
    context: settings_1.sourceDir,
    entry: path_1.default.join(settings_1.sourceDir, 'index.ts'),
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
    node: {
        __dirname: true,
        __filename: true,
    },
    optimization: {
        nodeEnv: process.env.NODE_ENV,
        namedModules: true,
        noEmitOnErrors: true,
    },
    plugins: __spreadArrays(plugins_1.devPlugins, [
        // new CleanWebpackPlugin() as any,
        // defineStaticDirConst,
        plugins_1.defineNodeEnvConst,
    ]),
    module: {
        rules: [],
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcuY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZ3Mvd2VicGFjay5jb25maWcuY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLDhDQUF3QjtBQUV4QixxQ0FBMkQ7QUFDM0QsdUNBQXNEO0FBRXRELGtCQUFlO0lBQ2IsT0FBTyxFQUFFLGdCQUFLLENBQUMsQ0FBQyxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQyxTQUFTO0lBQzNELE9BQU8sRUFBRSxvQkFBUztJQUNsQixLQUFLLEVBQUUsY0FBSSxDQUFDLElBQUksQ0FBQyxvQkFBUyxFQUFFLFVBQVUsQ0FBQztJQUN2QyxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsaUJBQU07UUFDWixRQUFRLEVBQUUsWUFBUyxnQkFBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixTQUFLO1FBQ3JELGFBQWEsRUFBRSxZQUFTLGdCQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLFNBQUs7S0FDM0Q7SUFDRCxLQUFLLEVBQUU7UUFDTCxRQUFRLEVBQUUsS0FBSztRQUNmLGNBQWMsRUFBRSw0QkFBNEI7S0FDN0M7SUFDRCxPQUFPLEVBQUU7UUFDUCxLQUFLLEVBQUU7WUFDTCx3Q0FBd0M7WUFDeEMsd0NBQXdDO1lBQ3hDLGdEQUFnRDtZQUNoRCw0Q0FBNEM7WUFDNUMseUNBQXlDO1lBQ3pDLFdBQVcsRUFBRSx1QkFBdUI7U0FDckM7UUFDRCxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7S0FDN0M7SUFDRCxJQUFJLEVBQUU7UUFDSixTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsWUFBWSxFQUFFO1FBQ1osT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUTtRQUM3QixZQUFZLEVBQUUsSUFBSTtRQUNsQixjQUFjLEVBQUUsSUFBSTtLQVlyQjtJQUNELE9BQU8saUJBQ0Ysb0JBQVU7UUFDYixtQ0FBbUM7UUFDbkMsd0JBQXdCO1FBQ3hCLDRCQUFrQjtNQUNuQjtJQUNELE1BQU0sRUFBRTtRQUNOLEtBQUssRUFBRSxFQUNOO0tBQ0Y7Q0FDdUIsQ0FBQyJ9