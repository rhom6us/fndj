import { RuleBuilder } from './builder';
import { css_extract_loader, css_hot_loader, css_loader, postcssLoader, sassLoader } from './loaders';
import { isDev } from './settings';


const node_modules = /node_modules/i;
//#region code
const builder = new RuleBuilder(isDev);



export const wasmRule = builder.when(/\.wasm$/i).asAsset(true).result();
export const wavRule = builder.when(/\.wav$/i).asAsset(false).result();
// export const typescriptRule = builder
//   .when(/\.[tj]sx?$/i)
//   .butNotWhen(node_modules)
//   .usingDev(babel_loader('top_level_await', 'class_properties', 'jsx_self', 'jsx_source'))
//   .usingProd(babel_loader('top_level_await', 'class_properties'))
//   .usingDev(ts_loader('react_refresh', 'transpile_only'))
//   .usingProd(ts_loader())
//   .result('typescriptRule');

// export const typescriptRule: RuleSetRule = {
//   test: /\.[tj]sx?$/i,
//   exclude: [node_modules],
//   use: [
//     babel_loader('top_level_await', 'class_properties'),
//     ...onlyif(isDev, ts_loader('react_refresh', 'transpile_only')),
//     ...onlyif(!isDev, ts_loader()),
//   ],
// }

// export const jsRule: RuleSetRule = {
//   test: /\.js$/i,
//   exclude: [node_modules],
//   use: [ts_with_react_refresh_loader],
// };
// export const scriptRule: RuleSetRule = {
//   test: /\.(j|t)sx?$/i,
//   exclude: [node_modules],
//   use: [babelLoader],
// };





//#endregion

//#region styles
export const globalStylesheetRule = {
  test: /\b(global|vars)\.s?css$/i,
  use: [
    css_hot_loader(),
    css_extract_loader,
    css_loader({
      importLoaders: 2,
      modules: false,
      sourceMap: true,
    }),
    postcssLoader,
    sassLoader
  ],
};
// export const globalStylesheetRule = builder.when(/\b(global|vars)\.s?css$/i)
//   .usingDev(css_hot_loader())
//   .using(css_extract_loader)
//   .usingDev(
//     css_loader({
//       importLoaders: 2,
//       modules: false,
//       sourceMap: true,
//     })
//   )
//   .usingProd(
//     css_loader({
//       importLoaders: 2,
//       modules: false,
//       sourceMap: false,
//     })
//   )
//   .using(
//     postcssLoader,
//     sassLoader,
//   )
//   .result('global stylesheet rule');
export const stylesheetRule = builder.when(/\.s?css$/i).butNotWhen(globalStylesheetRule.test, node_modules)
  .usingDev(
    css_hot_loader({
      cssModule: true
    })
  )
  .using(
    css_extract_loader
  )
  .usingDev(
    css_loader({
      importLoaders: 2,
      modules: true,
      import: true,
      sourceMap: true,
    })
  )
  .usingProd(
    css_loader({
      importLoaders: 2,
      modules: true,
      import: true,
      sourceMap: false,
    })
  )
  .using(
    postcssLoader,
    sassLoader,
  )
  .result('stylesheetRule');

// export const globalStylesheetRule: RuleSetRule = {
//   test: /\b(global|vars)\.s?css$/i,
//   use: [
//     ...onlyif(isDev, css_hot_loader()),
//     cssExtractLoader(),
//     css_loader({
//       importLoaders: 2,
//       modules: false,
//       sourceMap: isDev,
//     }),
//     postcssLoader,
//     sassLoader
//   ],
// };
// export const stylesheetRule: RuleSetRule = {
//   test: /\.s?css$/i,
//   exclude: /\b(global|vars)\.s?css$/i,
//   use: [
//     ...onlyif(isDev, css_hot_loader({ cssModule: true })),
//     cssExtractLoader({ esModule: true }),
//     css_loader({
//       importLoaders: 2,
//       modules: true,
//       import: true,
//       sourceMap: isDev,
//     }),
//     postcssLoader,
//     sassLoader
//   ],
// };
//#endregion



export const imageRule = builder.when(/\.(png|jpg|gif)$/i)
  .asAsset()
  .result();
export const fontRule = builder.when(/\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i)
  .asAsset()
  .result();
export const htmlRule = builder.when(/\.(html)$/i)
  .using('html-loader')
  .result('htmlRule');
