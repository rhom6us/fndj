import path from 'path';
import { Configuration } from 'webpack';
import { cleanBuildDir, createIndexHtml, extractCssFiles } from './plugins';
import {
    fontRule, globalStylesheetRule, htmlRule, imageRule, nodeRule, reactTypescriptRule,
    stylesheetRule, typescriptRule, workletRule
} from './rules';
import { entryPoint, projectDir } from './settings';
import config from './webpack.config.common';

export const configuration: Configuration = {
    ...config,
    target: 'web',
    entry: entryPoint,//path.join(projectDir, 'src/index.ts'),
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
            typescriptRule,
            reactTypescriptRule,
            nodeRule,
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
        cleanBuildDir
    ],
};

export default configuration;
