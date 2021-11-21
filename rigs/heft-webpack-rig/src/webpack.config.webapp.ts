import { Configuration } from 'webpack';
import { onlyif } from './loaders';
import * as plugins from './plugins';
import * as rules from './rules';
import { isDev } from './settings';
import config from './webpack.config.common';
interface Config extends Configuration {
    experiments?: {
        outputModule?: boolean,
        syncWebAssembly?: boolean,
        topLevelAwait?: boolean,
        asyncWebAssembly?: boolean,
        layers?: boolean,
        lazyCompilation?: boolean,
    },
}


export const configuration: any = {
    ...config,
    devtool: "source-map",
    devServer: {
        port: 9080
    },
    // stats: 'verbose',
    // entry: [
    //     ...(Array.isArray(config.entry) ? config.entry : [config.entry]),
    //     `./node_modules/@fndj/core/src/web-audio/FnMeter/FnMeter.worklet.ts`
    // ],
    // target: 'node14',
    target: 'web',
    mode: isDev ? 'development' : 'production',
    // entry: entryPoint,//path.join(projectDir, 'src/index.ts'),
    // entry: [
    //    // 'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    //    // 'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    //     entryPoint // Your appʼs entry point
    // ],
    output: {
        ...config.output,
        // chunkLoading: "import",
        publicPath: '/',
    },
    resolve: {
        ...config.resolve,

        extensions: [
            ...config.resolve!.extensions,
            '.css',
        ],


    },
    module: {
        ...config.module,
        rules: [
            rules.wavRule,
            // rules.typescriptRule,
            {
                test: /\.js$/,
                enforce: 'pre',
                use: [require.resolve('source-map-loader')]
            },
            rules.globalStylesheetRule,
            rules.stylesheetRule,
            rules.imageRule,
            rules.fontRule,
            rules.htmlRule,
        ],
    },
    plugins: [
        ...config.plugins,
        ...onlyif(isDev,
            // plugins.webpackBar,
            // plugins.reachRefresh,
            // plugins.tsChecker,
            // plugins.tsCheckerNotifier
        ),

        // isDev && plugins.hotModuleReplacement,
        plugins.createIndexHtml,
        plugins.extractCssFiles,
        // plugins.cleanBuildDir,
        // hotModuleReplacement
    ],
    experiments: {
        ...config.experiments,
        outputModule: true
    }


};


export default configuration;
