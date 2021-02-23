"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.outDir = exports.staticSourceDir = exports.rootDir = exports.entryPoint = exports.projectDir = exports.isDev = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
exports.isDev = process.env.NODE_ENV !== 'production';
exports.projectDir = path_1.default.resolve('.');
var packageJson = fs_1.default.readFileSync(path_1.default.join('.', 'package.json'));
var pkg = JSON.parse(packageJson);
exports.entryPoint = pkg.main;
// This will be running from "./packages/@fndj/main/" or the like.
// Get back up to the root dir
exports.rootDir = path_1.default.join(exports.projectDir, '../../../');
exports.staticSourceDir = path_1.default.join(exports.rootDir, 'static');
exports.outDir = path_1.default.join(exports.rootDir, 'dist');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlncy9zZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4Q0FBd0I7QUFDeEIsMENBQW9CO0FBS1AsUUFBQSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssWUFBWSxDQUFDO0FBQzlDLFFBQUEsVUFBVSxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUMsSUFBTSxXQUFXLEdBQUcsWUFBRSxDQUFDLFlBQVksQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO0FBQ3BFLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBa0IsQ0FBQyxDQUFDO0FBQzlCLFFBQUEsVUFBVSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFHbkMsa0VBQWtFO0FBQ2xFLDhCQUE4QjtBQUNqQixRQUFBLE9BQU8sR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFFN0MsUUFBQSxlQUFlLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxlQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDL0MsUUFBQSxNQUFNLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxlQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMifQ==