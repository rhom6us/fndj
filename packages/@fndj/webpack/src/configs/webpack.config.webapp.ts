import path from 'path';
import { Configuration } from 'webpack';
import { cleanBuildDir, createIndexHtml, extractCssFiles, hotModuleReplacement } from './plugins';
import {
    fontRule, globalStylesheetRule, htmlRule, imageRule, nodeRule, reactTypescriptRule,
    stylesheetRule, typescriptRule, workletRule
} from './rules';
import { entryPoint, projectDir } from './settings';
import config from './webpack.config.common';

export const configuration: Configuration = {
    ...config,
    target: 'web',
    // entry: entryPoint,//path.join(projectDir, 'src/index.ts'),
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        entryPoint // Your appʼs entry point
    ],
    resolve: {
        ...config.resolve,
        extensions: [
            ...config.resolve.extensions,
            '.tsx', '.css', '.scss'
        ],

    },
    module: {
        ...config.module,
        rules: [
            workletRule,
            reactTypescriptRule,
            typescriptRule,
            // nodeRule,
            globalStylesheetRule,
            stylesheetRule,
            imageRule,
            fontRule,
            htmlRule,
        ],
    },
    plugins: [
        ...config.plugins,
        createIndexHtml,
        extractCssFiles,
        cleanBuildDir,
        hotModuleReplacement
    ],
};

export default configuration;
