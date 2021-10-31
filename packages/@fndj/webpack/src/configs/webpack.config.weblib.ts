import path from 'path';
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
    output:{
        ...config.output,
        filename: '[name].js',
        library: {
            name:'[name]',
            type: 'umd'
        }
    },
    /**
     * PEER DEPENDANCIES
     */
    externals:{
        react: 'react',
    },
    /**
     * Webpack will generate code like import * as X from '...' for externals used in a module.
     */
    externalsType:'module',


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
        alias: {
            ...config.resolve.alias,
            '@fndj/browser': [path.join(__dirname, 'packages', '@fndj/browser'), path.join(config.context, 'src')],
        },
        extensions: [
            ...config.resolve!.extensions,
            '.tsx', '.css', '.swcss', '.wasm', '.workletts'
        ],
        fallback: {
            ...config.resolve.fallback,
        }

    },
    module: {
        ...config.module,
        rules: [
            rules.workletRule,
            // rules.workerRule,
            rules.wasmRule,
            rules.wavRule,
            rules.typescriptRule,
            rules.globalStylesheetRule,
            rules.stylesheetRule,
            rules.imageRule,
            rules.fontRule,
            rules.htmlRule,
        ],
    },
    plugins: [
        ...onlyif(isDev,
            plugins.webpackBar,
            plugins.reachRefresh,
            plugins.tsChecker,
            plugins.tsCheckerNotifier
        ),

        // isDev && plugins.hotModuleReplacement,
        plugins.createIndexHtml,
        plugins.extractCssFiles,
        // plugins.cleanBuildDir,
        // hotModuleReplacement
    ],
    experiments: {
        ...config.experiments,
        outputModue: true
    }

};


export default configuration;
