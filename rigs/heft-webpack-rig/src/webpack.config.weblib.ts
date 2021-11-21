import { Configuration } from 'webpack';
import { onlyif } from './loaders';
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
    output: {
        ...config.output,
        // module: true,
        library: {
            // name: '__[name]',
            type: 'commonjs2'
        }
    },
    // optimization: {
    //     concatenateModules: true
    // },
    // experiments: {
    //     ...config.experiments,
    //     outputModule: true
    // },
    // externalsType: 'module',
    /**
     * PEER DEPENDANCIES
     */
    externals: {
        "realm-web": "commonjs realm-web",
        react: 'commonjs react',
        "@rhombus/audio-context": "commonjs @rhombus/audio-context"
    },
    /**
     * Webpack will generate code like import * as X from '...' for externals used in a module.
     */
    devtool: 'source-map',
    // devtool: "eval-cheap-module-source-map",
    target: 'web',
    mode: isDev ? 'development' : 'production',
    // entry: entryPoint,//path.join(projectDir, 'src/index.ts'),
    // entry: [
    //    // 'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    //    // 'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    //     entryPoint // Your appʼs entry point
    // ],
    resolve: {
        ...config.resolve,
        extensions: [
            ...config.resolve!.extensions,
            '.css', '.wasm'
        ],
        fallback: {
            ...config.resolve.fallback,
        }

    },
    module: {
        ...config.module,
        rules: [
            // rules.workletRule,
            // rules.workerRule,
            rules.wasmRule,
            rules.wavRule,
            {
                test: /\.js$/,
                enforce: 'pre',
                use: [require.resolve('source-map-loader')]
            },
            // rules.globalStylesheetRule,
            rules.stylesheetRule,
            rules.imageRule,
            rules.fontRule,
            // rules.htmlRule,
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
        // plugins.createIndexHtml,
        // plugins.extractCssFiles,
        // plugins.cleanBuildDir,
        // hotModuleReplacement
    ]

};


export default configuration;
