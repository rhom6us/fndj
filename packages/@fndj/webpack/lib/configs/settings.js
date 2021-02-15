"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.outDir = exports.staticSourceDir = exports.rootDir = exports.sourceDir = exports.isDev = void 0;
var path_1 = __importDefault(require("path"));
exports.isDev = process.env.NODE_ENV !== 'production';
exports.sourceDir = path_1.default.resolve('.');
// This will be running from "./packages/@fndebrid/electron-main/" or the like.
// Get back up to the root dir
exports.rootDir = path_1.default.join(exports.sourceDir, '../../../');
exports.staticSourceDir = path_1.default.join(exports.rootDir, 'static');
exports.outDir = path_1.default.join(exports.rootDir, 'dist');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlncy9zZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4Q0FBd0I7QUFLWCxRQUFBLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZLENBQUM7QUFDOUMsUUFBQSxTQUFTLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUUzQywrRUFBK0U7QUFDL0UsOEJBQThCO0FBQ2pCLFFBQUEsT0FBTyxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsaUJBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUU1QyxRQUFBLGVBQWUsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLGVBQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMvQyxRQUFBLE1BQU0sR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLGVBQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyJ9