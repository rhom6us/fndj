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
    // compiler.run(callback);
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
        var config, devServerConfig, compiler, server;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = __assign(__assign({}, configs[app]), { watch: true });
                    devServerConfig = {
                        host: 'localhost',
                        port: 9080,
                        // hot: true,
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
                    compiler = (0, webpack_1.default)(config);
                    server = new webpack_dev_server_1.default(devServerConfig, compiler);
                    return [4 /*yield*/, server.start()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, new URL("http://" + devServerConfig.host + ":" + devServerConfig.port + "/")];
            }
        });
    });
}
exports.serve = serve;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21waWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLG9EQUE0RTtBQUM1RSwwRUFBdUQ7QUFDdkQsMERBQW9DO0FBQ3BDLGlEQUFxQztBQUtyQyw2RUFBNkU7QUFDN0Usd0NBQXdDO0FBQ3hDLHNKQUFzSjtBQUN0SixJQUFJO0FBRUosU0FBUyxXQUFXLENBQUMsTUFBcUIsRUFBRSxRQUFnQztJQUMxRSxJQUFNLFFBQVEsR0FBRyxJQUFBLGlCQUFPLEVBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzNDLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtRQUNoQixRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFVBQUEsV0FBVztZQUNwRCxtQkFBUyxDQUFDLElBQUksQ0FBQyxrQkFBZSxDQUFBLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxJQUFJLEtBQUksRUFBRSxxQkFBWSxDQUFDLENBQUM7UUFDckUsQ0FBQyxDQUFDLENBQUM7S0FDSjtTQUFNO1FBQ0wsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxVQUFBLFdBQVc7WUFDckQsbUJBQVMsQ0FBQyxJQUFJLENBQUMsa0JBQWUsQ0FBQSxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsSUFBSSxLQUFJLEVBQUUsb0JBQVcsQ0FBQyxDQUFDO1FBQ3BFLENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFDRCxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFVBQUEsS0FBSzs7UUFDMUMsbUJBQVMsQ0FBQyxJQUFJLENBQUMsa0JBQWUsQ0FBQSxN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