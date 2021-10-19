#!/usr/bin/env node
"use strict";
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
/* eslint-disable no-console */
var cjs_ponyfill_1 = require("abortcontroller-polyfill/dist/cjs-ponyfill");
var readline_1 = __importDefault(require("readline"));
var compile_1 = require("./compile");
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'OHAI> '
});
var _a = process.argv.reverse().slice(0, 2), app = _a[1];
// ...process.argv.slice(process.argv.length - 3, process.argv.length-1)
var controller = new cjs_ponyfill_1.AbortController();
(0, compile_1.serve)(app, controller.signal).then(function (_a) {
    var url = _a[0], server = _a[1];
    rl.prompt();
    rl.on('line', function (line) { return __awaiter(void 0, void 0, void 0, function () {
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
                    rl.prompt();
                    return [2 /*return*/];
            }
        });
    }); }).on('close', function () {
        console.log('Have a great day!');
        server.stop();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm5zZXJ2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9mbnNlcnZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLCtCQUErQjtBQUMvQiwyRUFBNkU7QUFDN0Usc0RBQWdDO0FBQ2hDLHFDQUFrQztBQUVsQyxJQUFNLEVBQUUsR0FBRyxrQkFBUSxDQUFDLGVBQWUsQ0FBQztJQUNsQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7SUFDcEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO0lBQ3RCLE1BQU0sRUFBRSxRQUFRO0NBQ2pCLENBQUMsQ0FBQztBQUVHLElBQUEsS0FBVSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUF1QixFQUEvRCxHQUFHLFFBQTRELENBQUM7QUFDekUsd0VBQXdFO0FBQ3hFLElBQU0sVUFBVSxHQUFHLElBQUksOEJBQWUsRUFBRSxDQUFDO0FBQ3pDLElBQUEsZUFBSyxFQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsRUFBYTtRQUFaLEdBQUcsUUFBQSxFQUFFLE1BQU0sUUFBQTtJQUM1QyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDWixFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFPLElBQUk7Ozs7b0JBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztvQkFDcEMscUJBQU0sTUFBTSxDQUFDLElBQUksRUFBRSxFQUFBOztvQkFBbkIsU0FBbUIsQ0FBQztvQkFDcEIsT0FBTyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO29CQUM1QyxxQkFBTSxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUE7O29CQUFwQixTQUFvQixDQUFDO29CQUNyQixPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN6QixFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7U0FDYixDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtRQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMvQixNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbEIsQ0FBQyxDQUFDLENBQUM7QUFDVCxDQUFDLENBQUMsQ0FBQSJ9