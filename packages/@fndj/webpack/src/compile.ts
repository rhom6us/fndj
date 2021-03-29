import { Server } from 'http';
import webpack, { Compiler, Configuration, Stats, Watching } from 'webpack';
import WebpackDevServer, { addDevServerEntrypoints } from 'webpack-dev-server';
import cliLogger from './cliLogger';
import * as configs from './configs';
import { App, staticSourceDir } from './configs/settings';

// function validate(value: string[]): value is [Command, App, Environment] {
//   const [command, app, mode] = value;
//   return ['fnbuild', 'fnwatch', 'fnserve'].includes(command) && ['main', 'renderer'].includes(app) && ['production', 'development'].includes(mode);
// }

function getCompiler(config: Configuration) {
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
function getCallback(config: Configuration) {
  return (err: Error, stats: Stats) => {
    if (err) {
      process.stderr.write('\n\n');
      process.stderr.write(err.stack || err + '\n');
      if (!config.watch) {
        process.exit(1);
      }
      // console.error(err.stack || err);
      // if (err.details) {
      //   console.error(err.details);
      // }
      // return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      process.stderr.write('\n\n');
      process.stderr.write(info.errors + '\n');
    }

    // // if (stats.hasWarnings()) {
    // //   console.warn(info.warnings);
    // // }

    // console.log(
    //   stats.toString({
    //     assets: false,
    //     chunks: false, // Makes the build much quieter
    //     colors: true, // Shows colors in the console
    //   }),
    // );
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
export function compile(app: App): Compiler {
  const config = { ...configs[app], watch: true };
  const compiler = getCompiler(config);
  const callback = getCallback(config);

  compiler.run(callback);
  return compiler;
}
export function watch(app: App): Watching {
  const config = { ...configs[app], watch: true };
  const compiler = getCompiler(config);
  const callback = getCallback(config);
  return compiler.watch({}, callback);
}

export function serve(app: App): Server {
  const config = { ...configs[app], watch: true };
  const devServerConfig: WebpackDevServer.Configuration = {
    contentBase: [staticSourceDir],
    host: 'localhost',
    port: 9080,
    // hot: true,
    noInfo: true,
    open: false,
    overlay: true,
    historyApiFallback: true,
    // clientLogLevel: "warning",
    stats: {
      colors: true,
      assets: false,
      entrypoints: false,
      warnings: false,
      // warningsFilter(warning) {
      //   const pattern = /export .* was not found in/i;
      //   return warning.split(/\r?\n/g).every(line => !pattern.test(line));
      // },
      modules: false,
      timings: false,
      version: false,
      hash: false,
    },
  };
  addDevServerEntrypoints(config, devServerConfig);
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
  const server = new WebpackDevServer(webpack(config) as any, devServerConfig);
  return server.listen(devServerConfig.port!, devServerConfig.host!, () => {
    // eslint-disable-next-line no-console
    console.log(`dev server ready on http://${devServerConfig.host}:${devServerConfig.port}/`);
  });
}
