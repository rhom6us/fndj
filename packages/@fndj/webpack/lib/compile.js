"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = exports.watch = exports.compile = void 0;
var webpack_1 = __importDefault(require("webpack"));
var webpack_dev_server_1 = __importStar(require("webpack-dev-server"));
var cliLogger_1 = __importDefault(require("./cliLogger"));
var configs = __importStar(require("./configs"));
var settings_1 = require("./configs/settings");
// function validate(value: string[]): value is [Command, App, Environment] {
//   const [command, app, mode] = value;
//   return ['fnbuild', 'fnwatch', 'fnserve'].includes(command) && ['main', 'renderer'].includes(app) && ['production', 'development'].includes(mode);
// }
function getCompiler(config) {
    var compiler = webpack_1.default(config);
    if (config.watch) {
        compiler.hooks.watchRun.tap('WebpackInfo', function (compilation) {
            cliLogger_1.default.info("Compilation " + ((compilation === null || compilation === void 0 ? void 0 : compilation.name) || '') + " watching\u2026");
        });
    }
    else {
        compiler.hooks.beforeRun.tap('WebpackInfo', function (compilation) {
            cliLogger_1.default.info("Compilation " + ((compilation === null || compilation === void 0 ? void 0 : compilation.name) || '') + " running\u2026");
        });
    }
    compiler.hooks.done.tap('WebpackInfo', function (stats) {
        var _a, _b;
        cliLogger_1.default.info("Compilation " + (((_b = (_a = stats === null || stats === void 0 ? void 0 : stats.compilation) === null || _a === void 0 ? void 0 : _a.compiler) === null || _b === void 0 ? void 0 : _b.name) || '') + " done.");
    });
    return compiler;
}
function getCallback(config) {
    return function (err, stats) {
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
        var info = stats.toJson();
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
function compile(app) {
    var config = __assign(__assign({}, configs[app]), { watch: true });
    var compiler = getCompiler(config);
    var callback = getCallback(config);
    compiler.run(callback);
    return compiler;
}
exports.compile = compile;
function watch(app) {
    var config = __assign(__assign({}, configs[app]), { watch: true });
    var compiler = getCompiler(config);
    var callback = getCallback(config);
    return compiler.watch({}, callback);
}
exports.watch = watch;
function serve(app) {
    var config = __assign(__assign({}, configs[app]), { watch: true });
    var devServerConfig = {
        contentBase: [settings_1.staticSourceDir],
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
    webpack_dev_server_1.addDevServerEntrypoints(config, devServerConfig);
    function handler(err, stats) {
        if (err) {
            // eslint-disable-next-line no-console
            console.error(err);
        }
        if (stats) {
            // eslint-disable-next-line no-console
            console.info(stats);
        }
    }
    var server = new webpack_dev_server_1.default(webpack_1.default(config), devServerConfig);
    return server.listen(devServerConfig.port, devServerConfig.host, function () {
        // eslint-disable-next-line no-console
        console.log("dev server ready on http://" + devServerConfig.host + ":" + devServerConfig.port + "/");
    });
}
exports.serve = serve;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21waWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9EQUF1RjtBQUN2Rix1RUFBK0U7QUFDL0UsMERBQW9DO0FBQ3BDLGlEQUFxQztBQUNyQywrQ0FBMEQ7QUFFMUQsNkVBQTZFO0FBQzdFLHdDQUF3QztBQUN4QyxzSkFBc0o7QUFDdEosSUFBSTtBQUVKLFNBQVMsV0FBVyxDQUFDLE1BQXFCO0lBQ3hDLElBQU0sUUFBUSxHQUFHLGlCQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakMsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO1FBQ2hCLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsVUFBQSxXQUFXO1lBQ3BELG1CQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFlLENBQUEsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLElBQUksS0FBSSxFQUFFLHFCQUFZLENBQUMsQ0FBQztRQUNyRSxDQUFDLENBQUMsQ0FBQztLQUNKO1NBQU07UUFDTCxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFVBQUEsV0FBVztZQUNyRCxtQkFBUyxDQUFDLElBQUksQ0FBQyxrQkFBZSxDQUFBLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxJQUFJLEtBQUksRUFBRSxvQkFBVyxDQUFDLENBQUM7UUFDcEUsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUNELFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsVUFBQSxLQUFLOztRQUMxQyxtQkFBUyxDQUFDLElBQUksQ0FBQyxrQkFBZSxDQUFBLE1BQUEsTUFBQSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsV0FBVywwQ0FB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