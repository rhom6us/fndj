import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import type { RuleSetUseItem } from 'webpack';
import { isDev } from './settings';

export function onlyif<T extends any[]>(test: boolean, ...args: T): T | [] {
  if (test) {
    return args;
  }
  return [];
}



/**
 * Seperates css into a seperate bundle in order to prevent brief flash of unstyled content.
 */
export const css_extract_loader = MiniCssExtractPlugin.loader;
// export function css_extract_loader(options?: MiniCssExtractPlugin.LoaderOptions) {
//   return {
//     loader: MiniCssExtractPlugin.loader,
//     options
//   };
// }
export function css_hot_loader(options?: { cssModule: boolean; }) {
  return {
    loader: require.resolve('css-hot-loader'),
    options
  };
}

interface UrlOption {
  /**
   * Allow to filter url(). All filtered url() will not be resolved (left in the code as they were written).
   *
   * @param {string} url
   * @param {string} resourcePath
   * @returns {boolean}
   * @memberof UrlOption
   */
  filter(url: string, resourcePath: string): boolean;
}
interface CssLoaderOptions {

  /**
   * Allow to enable/disables handling the CSS functions url and image-set. If set to false, css-loader will not parse any paths specified in url or image-set. A function can also be passed to control this behavior dynamically based on the path to the asset. Starting with version 4.0.0, absolute paths are parsed based on the server root.
   *
   * @type {(string | UrlOption)}
   * @default true
   * @memberof CssLoaderOptions
   */
  url?: string | UrlOption;
  /**
   * Allows to enable/disable CSS Modules or ICSS and setup configuration:
   * - undefined: enable CSS modules for all files matching /\.module\.\w+$/i.test(filename) and /\.icss\.\w+$/i.test(filename) regexp.
   * - true: enable CSS modules for all files.
   * - false: disables CSS Modules for all files.
   * - string: disables CSS Modules for all files and set the mode option, more information you can read here
   * - object: enable CSS modules for all files, if modules.auto option is not specified, otherwise the modules.auto option will determine whether if it is CSS modules or not, more information you can read here
   *
   * The modules option enables/disables the CSS Modules specification and setup basic behaviour.
   *
   * Using false value increase performance because we avoid parsing CSS Modules features, it will be useful for developers who use vanilla css or use other technologies.
   *
   * @type {boolean}
   * @default undefined
   * @memberof CssLoaderOptions
   */
  modules?: boolean;
  /**
   * Allows to enables/disables or setups number of loaders applied before CSS loader for @import at-rules, CSS modules and ICSS imports, i.e. @import/composes/@value value from './values.css'/etc.
   *
   * The option importLoaders allows you to configure how many loaders before css-loader should be applied to @imported resources and CSS modules/ICSS imports.
   *
   * @type {number}
   * @default 0
   * @memberof CssLoaderOptions
   */
  importLoaders: number;
  sourceMap?: boolean;
  /**
   * Allows to enables/disables @import at-rules handling. Control @import resolving. Absolute urls in @import will be moved in runtime code.
   *
   * @type {boolean}
   * @default true
   * @memberof CssLoaderOptions
   */
  import?: boolean;
}

export function css_loader(options?: CssLoaderOptions) {
  return {
    loader: require.resolve('css-loader'),
    options
  };
}
export const postcssLoader: RuleSetUseItem = {
  loader: 'postcss-loader',
  options: {
    sourceMap: isDev,
    postcssOptions: {
      plugins: [postcssImport(), postcssPresetEnv()]
    },
  },
};
export const sassLoader: RuleSetUseItem = {
  loader: 'sass-loader',
  options: {
    sourceMap: isDev,
  },
};
export const threadLoader: RuleSetUseItem = {
  loader: 'thread-loader',
};




export function babel_loader(...features: Array<'top_level_await' | 'class_properties' | 'jsx_self' | 'jsx_source'>) {
  return {
    loader: require.resolve('babel-loader'),
    options: {
      plugins: [
        ...onlyif(features.includes('top_level_await'), '@babel/plugin-syntax-top-level-await'),
        ...onlyif(features.includes('class_properties'), '@babel/plugin-proposal-class-properties'),
        ...onlyif(features.includes('jsx_self'), '@babel/plugin-transform-react-jsx-self'),
        ...onlyif(features.includes('jsx_source'), '@babel/plugin-transform-react-jsx-source'),
      ]
    }
  };
}
export function ts_loader(...features: Array<'react_refresh' | 'transpile_only'>) {
  return {
    loader: require.resolve('ts-loader'),
    options: {
      getCustomTransformers: () => ({
        before: onlyif(features.includes('react_refresh'), ReactRefreshTypeScript()),
      }),
      transpileOnly: features.includes('transpile_only')
      // configFile: "C:\\dev\\fndebrid\\tsconfig.json"
    },
  };
}

export const node_loader: RuleSetUseItem = {
  loader: 'node-loader'
};
