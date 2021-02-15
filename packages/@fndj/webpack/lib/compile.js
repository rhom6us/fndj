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
        hot: true,
        noInfo: true,
        open: false,
        overlay: true,
        // clientLogLevel: "warning",
        stats: {
            colors: true,
            assets: false,
            entrypoints: false,
            warnings: false,
            warningsFilter: function (warning) {
                var pattern = /export .* was not found in/i;
                return warning.split(/\r?\n/g).every(function (line) { return !pattern.test(line); });
            },
            modules: false,
            timings: false,
            version: false,
            hash: false,
        },
    };
    webpack_dev_server_1.addDevServerEntrypoints(config, devServerConfig);
    var server = new webpack_dev_server_1.default(getCompiler(config), devServerConfig);
    return server.listen(devServerConfig.port, devServerConfig.host, function () {
        // eslint-disable-next-line no-console
        console.log("Starting server on http://" + devServerConfig.host + ":" + devServerConfig.port);
    });
}
exports.serve = serve;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21waWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9EQUE0RTtBQUM1RSx1RUFBK0U7QUFDL0UsMERBQW9DO0FBQ3BDLGlEQUFxQztBQUNyQywrQ0FBMEQ7QUFFMUQsNkVBQTZFO0FBQzdFLHdDQUF3QztBQUN4QyxzSkFBc0o7QUFDdEosSUFBSTtBQUVKLFNBQVMsV0FBVyxDQUFDLE1BQXFCO0lBQ3hDLElBQU0sUUFBUSxHQUFHLGlCQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakMsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO1FBQ2hCLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsVUFBQSxXQUFXO1lBQ3BELG1CQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFlLENBQUEsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLElBQUksS0FBSSxFQUFFLHFCQUFZLENBQUMsQ0FBQztRQUNyRSxDQUFDLENBQUMsQ0FBQztLQUNKO1NBQU07UUFDTCxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFVBQUEsV0FBVztZQUNyRCxtQkFBUyxDQUFDLElBQUksQ0FBQyxrQkFBZSxDQUFBLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxJQUFJLEtBQUksRUFBRSxvQkFBVyxDQUFDLENBQUM7UUFDcEUsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUNELFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsVUFBQSxLQUFLOztRQUMxQyxtQkFBUyxDQUFDLElBQUksQ0FBQyxrQkFBZSxhQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxXQUFXLDBDQUFFLFFBQVEsMENB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