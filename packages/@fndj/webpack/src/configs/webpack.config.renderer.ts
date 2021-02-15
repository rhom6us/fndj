
import miniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { createIndexHtml } from './plugins';
import {
    fontRule, globalStylesheetRule, htmlRule, imageRule, nodeRule, reactTypescriptRule,
    stylesheetRule, workletRule
} from './rules';
import config from './webpack.config.common';

export default {
  ...config,
  target: 'electron-renderer',
  resolve: {
    ...config.resolve,
    extensions: [...config.resolve.extensions, '.tsx', '.css', '.scss'],
  },
  module: {
    ...config.module,
    rules: [...config.module.rules, reactTypescriptRule, nodeRule, globalStylesheetRule, stylesheetRule, imageRule, fontRule, htmlRule, workletRule],
  },
  plugins: [
    ...config.plugins,
    createIndexHtml,
    miniCssExtractPlugin
  ],
} as webpack.Configuration;
