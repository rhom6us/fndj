#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var abort_controller_1 = require("abort-controller");
var compile_1 = require("./compile");
var _a = process.argv.reverse().slice(0, 2), app = _a[1];
// ...process.argv.slice(process.argv.length - 3, process.argv.length-1)
var controller = new abort_controller_1.AbortController();
(0, compile_1.watch)(app, controller.signal);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm53YXRjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9mbndhdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHFEQUFtRDtBQUNuRCxxQ0FBa0M7QUFHNUIsSUFBQSxLQUFVLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQXVCLEVBQS9ELEdBQUcsUUFBNEQsQ0FBQztBQUN6RSx3RUFBd0U7QUFDeEUsSUFBTSxVQUFVLEdBQUcsSUFBSSxrQ0FBZSxFQUFFLENBQUM7QUFDekMsSUFBQSxlQUFLLEVBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyJ9