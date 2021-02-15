import { Configuration } from 'webpack';
import { cleanBuildDir, createIndexHtml, extractCssFiles } from './plugins';
import {
    fontRule, globalStylesheetRule, htmlRule, imageRule, nodeRule, reactTypescriptRule,
    stylesheetRule, typescriptRule, workletRule
} from './rules';
import config from './webpack.config.common';

export const configuration: Configuration = {
    ...config,
    target: 'web',
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
