#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var compile_1 = require("./compile");
var _a = process.argv.reverse().slice(0, 2), app = _a[1];
// ...process.argv.slice(process.argv.length - 3, process.argv.length-1)
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
compile_1.compile(app);
//fndosomething('fnbuild', app, process.env.NODE_ENV || 'development');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm5idWlsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9mbmJ1aWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLHFDQUFvQztBQUc5QixJQUFBLEtBQVUsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBdUIsRUFBL0QsR0FBRyxRQUE0RCxDQUFDO0FBQ3pFLHdFQUF3RTtBQUN4RSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxhQUFhLENBQUM7QUFDN0QsaUJBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNiLHVFQUF1RSJ9