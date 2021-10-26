"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.targetElectronVersion = exports.outDir = exports.staticSourceDir = exports.rootDir = exports.entryPoint = exports.projectDir = exports.isDev = void 0;
var path_1 = __importDefault(require("path"));
exports.isDev = true; // process.env.NODE_ENV !== 'production';
exports.projectDir = path_1.default.resolve('.');
// const packageJson = fs.readFileSync(path.join('.', 'package.json'));
// const pkg = JSON.parse(packageJson as any);
// export const entryPoint: string = pkg.main;
exports.entryPoint = process.env.npm_package_main || process.env.npm_package_browser; //  pkg.main;
// This will be running from "./packages/@fndj/main/" or the like.
// Get back up to the root dir
exports.rootDir = path_1.default.resolve(path_1.default.join(exports.projectDir, '../../../'));
exports.staticSourceDir = path_1.default.join(exports.rootDir, 'static');
exports.outDir = path_1.default.resolve(path_1.default.join(exports.rootDir, 'dist'));
exports.targetElectronVersion = '6.0.12';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlncy9zZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4Q0FBd0I7QUFNWCxRQUFBLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQSx5Q0FBeUM7QUFDdEQsUUFBQSxVQUFVLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1Qyx1RUFBdUU7QUFDdkUsOENBQThDO0FBQzlDLDhDQUE4QztBQUNqQyxRQUFBLFVBQVUsR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxhQUFhO0FBRWhILGtFQUFrRTtBQUNsRSw4QkFBOEI7QUFDakIsUUFBQSxPQUFPLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFVLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztBQUUzRCxRQUFBLGVBQWUsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLGVBQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMvQyxRQUFBLE1BQU0sR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsZUFBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFHbEQsUUFBQSxxQkFBcUIsR0FBRyxRQUFRLENBQUMifQ==