import path from 'path';
import { Configuration } from 'webpack';
import * as plugins from './plugins';
import * as rules from './rules';
import { entryPoint, isDev, projectDir } from './settings';
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
    entry: [
        ...(Array.isArray(config.entry) ? config.entry : [config.entry]),
        `./node_modules/@fndj/core/src/web-audio/FnMeter/FnMeter.worklet.ts`
    ],
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
            rules.reactTypescriptRule,
            rules.globalStylesheetRule,
            rules.stylesheetRule,
            rules.imageRule,
            rules.fontRule,
            rules.htmlRule,
        ],
    },
    plugins: [
        ...config.plugins,

        isDev && plugins.hotModuleReplacement,
        isDev && plugins.reachRefresh,
        plugins.createIndexHtml,
        plugins.extractCssFiles,
        plugins.cleanBuildDir,
        // hotModuleReplacement
    ].filter(Boolean),
    experiments: {
        topLevelAwait: true,

    }


};


export default configuration;
