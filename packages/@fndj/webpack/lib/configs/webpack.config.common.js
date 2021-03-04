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
    devtool: settings_1.isDev ? 'cheap-module-eval-source-map' : undefined,
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
    node: {
        __dirname: true,
        __filename: true,
    },
    optimization: {
        nodeEnv: process.env.NODE_ENV,
        namedModules: true,
        noEmitOnErrors: true,
        // moduleIds: 'hashed',
        // runtimeChunk: 'single',
        // splitChunks: {
        //   cacheGroups: {
        //     vendor: {
        //       test: /[\\/]node_modules[\\/]/,
        //       name: 'vendor',
        //       chunks: 'all',
        //     },
        //   },
        // },
    },
    plugins: __spreadArray(__spreadArray([], plugins_1.devPlugins), [
        // new CleanWebpackPlugin() as any,
        // defineStaticDirConst,
        plugins_1.defineNodeEnvConst,
    ]),
    module: {
        rules: [],
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcuY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZ3Mvd2VicGFjay5jb25maWcuY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSw4Q0FBd0I7QUFFeEIscUNBQTJEO0FBQzNELHVDQUF1RDtBQUV2RCxrQkFBZTtJQUNiLE9BQU8sRUFBRSxnQkFBSyxDQUFDLENBQUMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUMsU0FBUztJQUMzRCxPQUFPLEVBQUUscUJBQVU7SUFDbkIsS0FBSyxFQUFFLGNBQUksQ0FBQyxJQUFJLENBQUMscUJBQVUsRUFBRSxVQUFVLENBQUM7SUFDeEMsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLGlCQUFNO1FBQ1osUUFBUSxFQUFFLFlBQVMsZ0JBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsU0FBSztRQUNyRCxhQUFhLEVBQUUsWUFBUyxnQkFBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixTQUFLO0tBQzNEO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsUUFBUSxFQUFFLEtBQUs7UUFDZixjQUFjLEVBQUUsNEJBQTRCO0tBQzdDO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsS0FBSyxFQUFFO1lBQ0wsd0NBQXdDO1lBQ3hDLHdDQUF3QztZQUN4QyxnREFBZ0Q7WUFDaEQsNENBQTRDO1lBQzVDLHlDQUF5QztZQUN6QyxXQUFXLEVBQUUsdUJBQXVCO1NBQ3JDO1FBQ0QsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDO0tBQzdDO0lBQ0QsSUFBSSxFQUFFO1FBQ0osU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsSUFBSTtLQUNqQjtJQUNELFlBQVksRUFBRTtRQUNaLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVE7UUFDN0IsWUFBWSxFQUFFLElBQUk7UUFDbEIsY0FBYyxFQUFFLElBQUk7UUFDcEIsdUJBQXVCO1FBQ3ZCLDBCQUEwQjtRQUMxQixpQkFBaUI7UUFDakIsbUJBQW1CO1FBQ25CLGdCQUFnQjtRQUNoQix3Q0FBd0M7UUFDeEMsd0JBQXdCO1FBQ3hCLHVCQUF1QjtRQUN2QixTQUFTO1FBQ1QsT0FBTztRQUNQLEtBQUs7S0FDTjtJQUNELE9BQU8sa0NBQ0Ysb0JBQVU7UUFDYixtQ0FBbUM7UUFDbkMsd0JBQXdCO1FBQ3hCLDRCQUFrQjtNQUNuQjtJQUNELE1BQU0sRUFBRTtRQUNOLEtBQUssRUFBRSxFQUNOO0tBQ0Y7Q0FDdUIsQ0FBQyJ9