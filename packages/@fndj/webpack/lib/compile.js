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
function getCompiler(config, callback) {
    var compiler = (0, webpack_1.default)(config, callback);
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
            console.error(err.stack || err);
            if (err['details']) {
                console.error(err['details']);
            }
            return;
        }
        var info = stats.toJson();
        if (stats.hasErrors()) {
            process.stderr.write('\n\n');
            process.stderr.write(info.errors + '\n');
        }
        if (stats.hasWarnings()) {
            console.warn(info.warnings);
        }
        console.log(stats.toString({
            assets: false,
            chunks: false,
            colors: true, // Shows colors in the console
        }));
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
    var callback = getCallback(config);
    var compiler = getCompiler(config, callback);
    compiler.run(callback);
    return compiler;
}
exports.compile = compile;
function watch(app) {
    var config = __assign(__assign({}, configs[app]), { watch: true });
    var callback = getCallback(config);
    var compiler = getCompiler(config, callback);
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
    (0, webpack_dev_server_1.addDevServerEntrypoints)(config, devServerConfig);
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
    var server = new webpack_dev_server_1.default((0, webpack_1.default)(config), devServerConfig);
    return server.listen(devServerConfig.port, devServerConfig.host, function () {
        // eslint-disable-next-line no-console
        console.log("dev server ready on http://" + devServerConfig.host + ":" + devServerConfig.port + "/");
    });
}
exports.serve = serve;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21waWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLG9EQUE0RTtBQUM1RSx1RUFBK0U7QUFDL0UsMERBQW9DO0FBQ3BDLGlEQUFxQztBQUNyQywrQ0FBMEQ7QUFJMUQsNkVBQTZFO0FBQzdFLHdDQUF3QztBQUN4QyxzSkFBc0o7QUFDdEosSUFBSTtBQUVKLFNBQVMsV0FBVyxDQUFDLE1BQXFCLEVBQUUsUUFBZ0M7SUFDMUUsSUFBTSxRQUFRLEdBQUcsSUFBQSxpQkFBTyxFQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMzQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7UUFDaEIsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxVQUFBLFdBQVc7WUFDcEQsbUJBQVMsQ0FBQyxJQUFJLENBQUMsa0JBQWUsQ0FBQSxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsSUFBSSxLQUFJLEVBQUUscUJBQVksQ0FBQyxDQUFDO1FBQ3JFLENBQUMsQ0FBQyxDQUFDO0tBQ0o7U0FBTTtRQUNMLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsVUFBQSxXQUFXO1lBQ3JELG1CQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFlLENBQUEsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLElBQUksS0FBSSxFQUFFLG9CQUFXLENBQUMsQ0FBQztRQUNwRSxDQUFDLENBQUMsQ0FBQztLQUNKO0lBQ0QsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxVQUFBLEtBQUs7O1FBQzFDLG1CQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFlLENBQUEsTUFBQSxNQUFBLEtBQUssYUFBTCxLQUFL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