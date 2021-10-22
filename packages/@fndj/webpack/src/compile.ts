/* eslint-disable no-console */
import { AbortSignal } from 'abortcontroller-polyfill/dist/cjs-ponyfill';
import webpack, { Configuration, Stats } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import cliLogger from './cliLogger';
import * as configs from './configs';
import { App } from './configs/settings';
declare interface CallbackWebpack<T> {
  (err?: Error, stats?: T): void;
}
// function validate(value: string[]): value is [Command, App, Environment] {
//   const [command, app, mode] = value;
//   return ['fnbuild', 'fnwatch', 'fnserve'].includes(command) && ['main', 'renderer'].includes(app) && ['production', 'development'].includes(mode);
// }

function getCompiler(config: Configuration) {
  delete config.watch;
  const compiler = webpack(config);
  if (config.watch) {
    compiler.hooks.watchRun.tap('WebpackInfo', compilation => {
      cliLogger.info(`Compilation ${compilation?.name || ''} watching…`);
    });
  } else {
    compiler.hooks.beforeRun.tap('WebpackInfo', compilation => {
      cliLogger.info(`Compilation ${compilation?.name || ''} running…`);
    });
  }
  compiler.hooks.done.tap('WebpackInfo', stats => {
    cliLogger.info(`Compilation ${stats?.compilation?.compiler?.name || ''} done.`);
  });
  return compiler;
}
function getCallback(config: Configuration): CallbackWebpack<Stats> {
  return (err: Error, stats: Stats) => {
    if (err) {
      process.stderr.write('\n\n');
      process.stderr.write(err.stack || err + '\n');
      if (!config.watch) {
        process.exit(1);
      }
      console.error(err.stack || err);
      if (err['details']) {
        console.error(err['details']);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      process.stderr.write('\n\n');
      process.stderr.write(info.errors + '\n');
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    console.log(
      stats.toString({
        assets: false,
        chunks: false, // Makes the build much quieter
        colors: true, // Shows colors in the console
      }),
    );
  };
}
// export default function fndosomething(command: 'fnbuild', app: App, env: Environment): Compiler;
// export default function fndosomething(command: 'fnwatch', app: App, env: Environment): Watching;
// export default function fndosomething(command: 'fnwatch', app: App, env: Environment): Server;
// export default function fndosomething(command: Command, app: App, env: Environment): unknown {
//   //export default function fndosomething(...args: [Command, string, string]): ReturnType<typeof compile> {
//   if (validate([command, app, env])) {
//     switch (command) {
//       case 'fnbuild':
//         return compile({ ...configs[app], watch: false });
//       case 'fnwatch':
//         return compile({ ...configs[app], watch: true });
//       case 'fnserve':
//         return serve({ ...configs[app], watch: true });
//     }
//   } else {
//     throw new Error(`invalid command "([${process.execPath}] ${process.execArgv.join(' ')}) -- ${process.argv.join(' ')}"`);
//   }
// }
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

  const watcher = compiler.watch({}, callback);
  signal.addEventListener('abort', () => watcher.close(closeError), { once: true });
  return watcher;
}

export async function serve(app: App, signal: AbortSignal): Promise<readonly [string, WebpackDevServer]> {
  const devServerConfig: WebpackDevServer.Configuration = {
    host: 'localhost',
    port: 9080,
    hot: true,
    open: false,
    historyApiFallback: true,
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
  signal.addEventListener('abort', async () => {
    console.info('stopping server....');
    await server.stop();
    console.info('stopped. starting server...');
    await server.start();
    console.info('started!');
  }, { once: false });
  const url = `http://${devServerConfig.host}:${devServerConfig.port}/`;
  console.log(`dev server ready on ${url}`)
  return [url, server] as const;
  // return server.listen(+devServerConfig.port!, devServerConfig.host!, () => {
  //   // eslint-disable-next-line no-console
  //   console.log(`dev server ready on http://${devServerConfig.host}:${devServerConfig.port}/`);
  // });
}
