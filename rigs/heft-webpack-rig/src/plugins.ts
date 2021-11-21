
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import { EnvironmentPlugin, HotModuleReplacementPlugin } from 'webpack';
import WorkerUrlPlugin from 'worker-url/plugin';
import { projectDir } from './settings';
export const reachRefresh = new ReactRefreshPlugin({
  forceEnable: true,
  esModule: true
});

export const workletPlugin = new WorkerUrlPlugin();

export const defineNodeEnvConst = new EnvironmentPlugin({ NODE_ENV: 'development' });
export const createIndexHtml = new HtmlWebpackPlugin({
  title: 'Webpack App',
  // template: `!!html-loader?minimize=false&url=false!${path.resolve(rendererSourceDir, 'template.html')}`,
  filename: `${'index'}.html`,
  // "chunks": [entry],
  inject: 'body',

  // "compile": true,
  // chunks: 'all',
  // excludeChunks: [],
  // "nodeModules": "C:\\dev\\fndebrid\\node_modules",
  meta: {
    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
  },
  template: path.join(projectDir, 'public/index.html')
});

/**
 * Seperates css into a seperate bundle in order to prevent brief flash of unstyled content.
 */
export const extractCssFiles = new MiniCssExtractPlugin({
  filename: '[id].styles.css',
  chunkFilename: '[id].styles.css',
  // moduleFilename: (name) => '[id].styles.css'
});
export const miniCssExtractPlugin = MiniCssExtractPlugin;
export const hotModuleReplacement = new HotModuleReplacementPlugin();
