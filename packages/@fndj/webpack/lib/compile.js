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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = exports.watch = exports.compile = void 0;
var webpack_1 = __importDefault(require("webpack"));
var webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
var cliLogger_1 = __importDefault(require("./cliLogger"));
var configs = __importStar(require("./configs"));
// function validate(value: string[]): value is [Command, App, Environment] {
//   const [command, app, mode] = value;
//   return ['fnbuild', 'fnwatch', 'fnserve'].includes(command) && ['main', 'renderer'].includes(app) && ['production', 'development'].includes(mode);
// }
function getCompiler(config) {
    delete config.watch;
    var compiler = (0, webpack_1.default)(config);
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
function closeError(err) {
    console.error('error closing the compiler', err);
}
function compile(app) {
    var config = __assign(__assign({}, configs[app]), { watch: false });
    var callback = getCallback(config);
    var compiler = getCompiler(config);
    // compiler.run(callback);
    compiler.run(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        compiler.close(closeError);
        return callback.apply(void 0, args);
    });
}
exports.compile = compile;
function watch(app, signal) {
    var config = __assign(__assign({}, configs[app]), { watch: false });
    var callback = getCallback(config);
    var compiler = getCompiler(config);
    var watcher = compiler.watch({}, callback);
    signal.addEventListener('abort', function () { return watcher.close(closeError); }, { once: true });
    return watcher;
}
exports.watch = watch;
function serve(app, signal) {
    return __awaiter(this, void 0, void 0, function () {
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
        var devServerConfig, compiler, server, url;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    devServerConfig = {
                        host: 'localhost',
                        port: 9080,
                        hot: true,
                        open: false,
                        historyApiFallback: true,
                        headers: {
                            'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
                            'Cross-Origin-Embedder-Policy': 'require-corp',
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
                    compiler = getCompiler(configs[app]);
                    server = new webpack_dev_server_1.default(devServerConfig, compiler);
                    return [4 /*yield*/, server.start()];
                case 1:
                    _a.sent();
                    signal.addEventListener('abort', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.info('stopping server....');
                                    return [4 /*yield*/, server.stop()];
                                case 1:
                                    _a.sent();
                                    console.info('stopped. starting server...');
                                    return [4 /*yield*/, server.start()];
                                case 2:
                                    _a.sent();
                                    console.info('started!');
                                    return [2 /*return*/];
                            }
                        });
                    }); }, { once: false });
                    url = "http://" + devServerConfig.host + ":" + devServerConfig.port + "/";
                    console.log("dev server ready on " + url);
                    return [2 /*return*/, [url, server]];
            }
        });
    });
}
exports.serve = serve;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21waWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLG9EQUF3RDtBQUN4RCwwRUFBa0Q7QUFDbEQsMERBQW9DO0FBQ3BDLGlEQUFxQztBQUtyQyw2RUFBNkU7QUFDN0Usd0NBQXdDO0FBQ3hDLHNKQUFzSjtBQUN0SixJQUFJO0FBRUosU0FBUyxXQUFXLENBQUMsTUFBcUI7SUFDeEMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ3BCLElBQU0sUUFBUSxHQUFHLElBQUEsaUJBQU8sRUFBQyxNQUFNLENBQUMsQ0FBQztJQUNqQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7UUFDaEIsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxVQUFBLFdBQVc7WUFDcEQsbUJBQVMsQ0FBQyxJQUFJLENBQUMsa0JBQWUsQ0FBQSxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsSUFBSSxLQUFJLEVBQUUscUJBQVksQ0FBQyxDQUFDO1FBQ3JFLENBQUMsQ0FBQyxDQUFDO0tBQ0o7U0FBTTtRQUNMLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsVUFBQSxXQUFXO1lBQ3JELG1CQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFlLENBQUEsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLElBQUksS0FBSSxFQUFFLG9CQUFXLENBQUMsQ0FBQztRQUNwRSxDQUFDLENBQUMsQ0FBQztLQUNKO0lBQ0QsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxVQUFBLEtBQUs7O1FBQzFDLG1CQUFTLENBQUMsSUFBSSxDQUFDLGtC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