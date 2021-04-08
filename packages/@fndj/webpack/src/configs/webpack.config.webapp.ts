import path from 'path';
import { Configuration } from 'webpack';
import * as plugins from './plugins';
import * as rules from './rules';
import { entryPoint, projectDir } from './settings';
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
    target: 'web',
    mode: 'development',
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
            '.tsx', '.css', '.scss'
        ],

    },
    module: {
        ...config.module,
        rules: [
            rules.workletRule,
            rules.reactTypescriptRule,
            rules.typescriptRule,
            // nodeRule,
            rules.globalStylesheetRule,
            rules.stylesheetRule,
            rules.imageRule,
            rules.fontRule,
            rules.htmlRule,
        ],
    },
    plugins: [
        ...config.plugins,
        plugins.createIndexHtml,
        plugins.extractCssFiles,
        plugins.cleanBuildDir,
        // hotModuleReplacement
    ],
    experiments: {
        topLevelAwait: true
    }


};


export default configuration;
