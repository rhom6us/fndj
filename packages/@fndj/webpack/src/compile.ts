/* eslint-disable no-console */
import { AbortSignal } from 'abort-controller';
import webpack, { Configuration, Stats } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import * as configs from './configs';
import { App } from './configs/settings';
declare interface CallbackWebpack<T> {
  (err?: Error, stats?: T): void;
}


function getCompiler(config: Configuration) {
  delete config.watch;
  const compiler = webpack(config);
  // if (config.watch) {
  //   compiler.hooks.watchRun.tap('WebpackInfo', compilation => {
  //     cliLogger.info(`Compilation ${compilation?.name || ''} watching…`);
  //   });
  // } else {
  //   compiler.hooks.beforeRun.tap('WebpackInfo', compilation => {
  //     cliLogger.info(`Compilation ${compilation?.name || ''} running…`);
  //   });
  // }
  // compiler.hooks.done.tap('WebpackInfo', stats => {
  //   cliLogger.info(`Compilation ${stats?.compilation?.compiler?.name || ''} done.`);
  // });
  return compiler;
}
function getCallback(config: Configuration): CallbackWebpack<Stats> {
  return (err: Error, stats: Stats) => {
    console.log(stats.toString('verbose'));
    return;
  };
}

function closeError(err: Error) {
  console.error('error closing the compiler', err);
}
export function compile(app: App) {
  const config = { ...configs[app], watch: false };
  const callback = getCallback(config);

  const compiler = getCompiler(config);

  // compiler.run(callback);
   compiler.run((...args) => {
    compiler.close(closeError);
    return callback(...args);
  });
}
export function watch(app: App, signal:AbortSignal) {
  const config = { ...configs[app], watch: false };
  const callback = getCallback(config);
  const compiler = getCompiler(config);

  const watcher = compiler.watch({

  }, callback);
  signal.addEventListener('abort', () => watcher.close(closeError), { once: true });
  return watcher;
}

export async function serve(app: App, signal: AbortSignal) {
  const devServerConfig: WebpackDevServer.Configuration = {
    host: 'localhost',
    port: 9080,
    hot: true,
    open: false,
    historyApiFallback: true,
    headers: {
      // 'Cross-Origin-Opener-Policy': 'same-origin',
      // 'Cross-Origin-Embedder-Policy': 'require-corp',

      
      /**
       * token for localhost:9080
       * valid until Jul 26, 2022 
       * 
       * Could also put it in the html:
       * <meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">
       */
      'Origin-Trial': 'AsIb6IddAbt9Zc87X/4Z14Cak3+hHwNSVh6AeRqvfPY5//w0DaCI/eVeds9OCDT/1K3cBvxg6i1LxOrkCow87wMAAABgeyJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjkwODAiLCJmZWF0dXJlIjoiVW5yZXN0cmljdGVkU2hhcmVkQXJyYXlCdWZmZXIiLCJleHBpcnkiOjE2NTg4Nzk5OTl9'
    }
    // clientLogLevel: "warning",

    // stats: {
    //   colors: true,
    //   assets: false,
    //   entrypoints: false,
    //   warnings: false,
    //   // warningsFilter(warning) {
    //   //   const pattern = /export .* was not found in/i;
    //   //   return warning.split(/\r?\n/g).every(line => !pattern.test(line));
    //   // },
    //   modules: false,
    //   timings: false,
    //   version: false,
    //   hash: false,
    // },
  };

  function handler(err: Error, stats: Stats) {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
    if (stats) {
      // eslint-disable-next-line no-console
      console.info(stats);
    }
  }
  // config.entry ??= {};
  // config.entry[process.env.npm_package_name].unshift(`webpack-dev-server/client?http://${devServerConfig.host}:${devServerConfig.port}/`, 'webpack/hot/dev-server');
  const compiler = getCompiler(configs[app]);
  const server = new WebpackDevServer(devServerConfig, compiler as any);
  await server.start();
  signal.addEventListener('abort', async (e) => {
    console.info('stopping server....');
    await server.stop();
    // console.info('stopped. starting server...');
    // await server.start();
    // console.info('started!');
  }, { once: true });
  const url = `http://${devServerConfig.host}:${devServerConfig.port}/`;
  console.log(`dev server ready on ${url}`)
  return url;//[url, server] as const;
  // return server.listen(+devServerConfig.port!, devServerConfig.host!, () => {
  //   // eslint-disable-next-line no-console
  //   console.log(`dev server ready on http://${devServerConfig.host}:${devServerConfig.port}/`);
  // });
}
