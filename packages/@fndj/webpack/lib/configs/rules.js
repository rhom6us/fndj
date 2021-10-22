"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlRule = exports.fontRule = exports.imageRule = exports.stylesheetRule = exports.globalStylesheetRule = exports.typescriptRule = exports.wavRule = exports.wasmRule = exports.workerRule = exports.workletRule = exports.workletQueryRule = void 0;
var builder_1 = require("./builder");
var loaders_1 = require("./loaders");
var settings_1 = require("./settings");
var node_modules = /node_modules/i;
//#region code
var builder = new builder_1.RuleBuilder(settings_1.isDev);
exports.workletQueryRule = builder
    .when(undefined)
    .withResourceQuery(/worklet/)
    .using(loaders_1.worklet_loader)
    .result();
exports.workletRule = builder
    .when(/\.worklet\.ts$/i)
    .using(loaders_1.worklet_loader)
    .result();
exports.workerRule = builder
    .when(/\.worker\.ts$/i)
    .butNotWhen(node_modules)
    .using(loaders_1.worker_loader)
    .result();
exports.wasmRule = builder.when(/\.wasm$/i).asAsset(false).result();
exports.wavRule = builder.when(/\.wav$/i).asAsset(false).result();
exports.typescriptRule = builder
    .when(/\.[tj]sx?$/i)
    .butNotWhen(node_modules)
    .usingDev((0, loaders_1.babel_loader)('top_level_await', 'class_properties', 'jsx_self', 'jsx_source'))
    .usingProd((0, loaders_1.babel_loader)('top_level_await', 'class_properties'))
    .usingDev((0, loaders_1.ts_loader)('react_refresh', 'transpile_only'))
    .usingProd((0, loaders_1.ts_loader)())
    .result('typescriptRule');
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
exports.globalStylesheetRule = {
    test: /\b(global|vars)\.s?css$/i,
    use: [
        (0, loaders_1.css_hot_loader)(),
        loaders_1.css_extract_loader,
        (0, loaders_1.css_loader)({
            importLoaders: 2,
            modules: false,
            sourceMap: true,
        }),
        loaders_1.postcssLoader,
        loaders_1.sassLoader
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
exports.stylesheetRule = builder.when(/\.s?css$/i).butNotWhen(exports.globalStylesheetRule.test, node_modules)
    .usingDev((0, loaders_1.css_hot_loader)({
    cssModule: true
}))
    .using(loaders_1.css_extract_loader)
    .usingDev((0, loaders_1.css_loader)({
    importLoaders: 2,
    modules: true,
    import: true,
    sourceMap: true,
}))
    .usingProd((0, loaders_1.css_loader)({
    importLoaders: 2,
    modules: true,
    import: true,
    sourceMap: false,
}))
    .using(loaders_1.postcssLoader, loaders_1.sassLoader)
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
exports.imageRule = builder.when(/\.(png|jpg|gif)$/i)
    .asAsset()
    .result();
exports.fontRule = builder.when(/\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i)
    .asAsset()
    .result();
exports.htmlRule = builder.when(/\.(html)$/i)
    .using('html-loader')
    .result('htmlRule');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlncy9ydWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBd0M7QUFDeEMscUNBQThKO0FBQzlKLHVDQUFtQztBQUduQyxJQUFNLFlBQVksR0FBRyxlQUFlLENBQUM7QUFDckMsY0FBYztBQUNkLElBQU0sT0FBTyxHQUFHLElBQUkscUJBQVcsQ0FBQyxnQkFBSyxDQUFDLENBQUM7QUFDMUIsUUFBQSxnQkFBZ0IsR0FBRyxPQUFPO0tBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDZixpQkFBaUIsQ0FBQyxTQUFTLENBQUM7S0FDNUIsS0FBSyxDQUFDLHdCQUFjLENBQUM7S0FDckIsTUFBTSxFQUFFLENBQUM7QUFDQyxRQUFBLFdBQVcsR0FBRyxPQUFPO0tBQy9CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztLQUN2QixLQUFLLENBQUMsd0JBQWMsQ0FBQztLQUNyQixNQUFNLEVBQUUsQ0FBQztBQUVDLFFBQUEsVUFBVSxHQUFHLE9BQU87S0FDOUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDO0tBQ3RCLFVBQVUsQ0FBQyxZQUFZLENBQUM7S0FDeEIsS0FBSyxDQUFDLHVCQUFhLENBQUM7S0FDcEIsTUFBTSxFQUFFLENBQUM7QUFFQyxRQUFBLFFBQVEsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUM1RCxRQUFBLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUMxRCxRQUFBLGNBQWMsR0FBRyxPQUFPO0tBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUM7S0FDbkIsVUFBVSxDQUFDLFlBQVksQ0FBQztLQUN4QixRQUFRLENBQUMsSUFBQSxzQkFBWSxF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