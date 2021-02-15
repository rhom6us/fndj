import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { DefinePlugin, EnvironmentPlugin } from 'webpack';
import WebpackBar from 'webpackbar';
import { staticSourceDir } from './settings';

export const devPlugins = [
        new WebpackBar(),
        new ForkTsCheckerWebpackPlugin({
          // silent: true
        })];
export const cleanBuildDir =  new CleanWebpackPlugin();

export const defineStaticDirConst = new DefinePlugin({
    __static: JSON.stringify(staticSourceDir),
  });
export const defineNodeEnvConst = new EnvironmentPlugin({ NODE_ENV: 'development' });
export const createIndexHtml = new HtmlWebpackPlugin({
    title: 'Webpack App',
    // template: `!!html-loader?minimize=false&url=false!${path.resolve(rendererSourceDir, 'template.html')}`,
    filename: `${'index'}.html`,
    // "chunks": [entry],
    inject: 'head',
    // "compile": true,
    chunks: 'all',
    // excludeChunks: [],
    // "nodeModules": "C:\\dev\\fndebrid\\node_modules",
    meta: {
      viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
    },
  });
export const extractCssFiles = new MiniCssExtractPlugin({
    filename: '[id].styles.css',
    chunkFilename: '[id].styles.css',
    // moduleFilename: (name) => '[id].styles.css'
  });
