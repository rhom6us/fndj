import webpack from 'webpack';
import { typescriptRule, workletRule } from './rules';
import config from './webpack.config.common';

export default {
  ...config,
  target: 'electron-main',
  stats: {
    warningsFilter: [/Can't resolve '(utf-8-validate|bufferutil)'/i, /export .* was not found in/i],
  },
  module: {
    ...config.module,
    rules: [typescriptRule, workletRule, ...config.module.rules],
  },
} as webpack.Configuration;
