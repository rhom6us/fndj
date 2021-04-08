

import webpack from 'webpack';
import * as plugins from './plugins';
import * as rules from './rules';
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
    rules: [
      ...config.module.rules,
      rules.reactTypescriptRule,
      rules.nodeRule,
      rules.globalStylesheetRule,
      rules.stylesheetRule,
      rules.imageRule,
      rules.fontRule,
      rules.htmlRule,
      rules.workletRule
    ],
  },
  plugins: [
    ...config.plugins,
    plugins.createIndexHtml,
    plugins.miniCssExtractPlugin
  ],
} as webpack.Configuration;
