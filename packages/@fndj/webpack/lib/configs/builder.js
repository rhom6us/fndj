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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleBuilder = void 0;
var RuleBuilder = /** @class */ (function () {
    function RuleBuilder(isDev) {
        this.isDev = isDev;
    }
    RuleBuilder.prototype.result = function (tag) {
        var result = __assign({}, this);
        delete result.isDev;
        if (tag) {
            console.log("******** " + tag + " ********", JSON.stringify(result, undefined, 4));
        }
        return result;
    };
    RuleBuilder.prototype.extend = function (rule) {
        return Object.assign(new RuleBuilder(this.isDev), this, rule);
    };
    RuleBuilder.prototype.when = function (test) {
        return this.extend({
            test: test
        });
    };
    ;
    RuleBuilder.prototype.butNotWhen = function () {
        var _a;
        var exclude = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            exclude[_i] = arguments[_i];
        }
        return this.extend({
            exclude: __spreadArray(__spreadArray([], ((_a = this.exclude) !== null && _a !== void 0 ? _a : []), true), exclude, true),
        });
    };
    ;
    RuleBuilder.prototype.asAsset = function (inline) {
        if (inline === void 0) { inline = undefined; }
        return this.extend({
            type: inline === undefined ? 'asset' :
                inline ? 'asset/inline' :
                    'asset/resource'
        });
    };
    ;
    RuleBuilder.prototype.withResourceQuery = function (resourceQuery) {
        return this.extend({ resourceQuery: resourceQuery });
    };
    ;
    RuleBuilder.prototype.usingDev = function () {
        var _a;
        var use = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            use[_i] = arguments[_i];
        }
        return this.extend({
            use: !this.isDev ? this.use : __spreadArray(__spreadArray([], ((_a = this.use) !== null && _a !== void 0 ? _a : []), true), use, true),
        });
    };
    ;
    RuleBuilder.prototype.usingProd = function () {
        var _a;
        var use = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            use[_i] = arguments[_i];
        }
        return this.extend({
            use: this.isDev ? this.use : __spreadArray(__spreadArray([], ((_a = this.use) !== null && _a !== void 0 ? _a : []), true), use, true),
        });
    };
    ;
    RuleBuilder.prototype.using = function () {
        var _a;
        var use = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            use[_i] = arguments[_i];
        }
        return this.extend({
            use: __spreadArray(__spreadArray([], ((_a = this.use) !== null && _a !== void 0 ? _a : []), true), use, true),
        });
    };
    return RuleBuilder;
}());
exports.RuleBuilder = RuleBuilder;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWdzL2J1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTQTtJQWNJLHFCQUE2QixLQUFjO1FBQWQsVUFBSyxHQUFMLEtBQUssQ0FBUztJQUUzQyxDQUFDO0lBVkQsNEJBQU0sR0FBTixVQUFPLEdBQVk7UUFDZixJQUFNLE1BQU0sR0FBRyxhQUFLLElBQUksQ0FBUyxDQUFDO1FBQ2xDLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNwQixJQUFJLEdBQUcsRUFBRTtZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBWSxHQUFHLGNBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMvRTtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFJTyw0QkFBTSxHQUFkLFVBQWUsSUFBVTtRQUNyQixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBQ0QsMEJBQUksR0FBSixVQUFLLElBQVk7UUFDYixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDZixJQUFJLE1BQUE7U0FDUCxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQUEsQ0FBQztJQUNGLGdDQUFVLEdBQVY7O1FBQVcsaUJBQW9CO2FBQXBCLFVBQW9CLEVBQXBCLHFCQUFvQixFQUFwQixJQUFvQjtZQUFwQiw0QkFBb0I7O1FBQzNCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNmLE9BQU8sa0NBQU0sQ0FBQyxNQUFBLElBQUksQ0FBQyxPQUFPLG1DQUFJLEVBQUUsQ0FBQyxTQUFLLE9BQU8sT0FBQztTQUNqRCxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQUEsQ0FBQztJQUNGLDZCQUFPLEdBQVAsVUFBUSxNQUF1QztRQUF2Qyx1QkFBQSxFQUFBLGtCQUF1QztRQUMzQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDZixJQUFJLEVBQ0EsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQ3JCLGdCQUFnQjtTQUMvQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQUEsQ0FBQztJQUNGLHVDQUFpQixHQUFqQixVQUFrQixhQUFxQjtRQUNuQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxhQUFhLGVBQUEsRUFBRSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUFBLENBQUM7SUFDRiw4QkFBUSxHQUFSOztRQUFTLGFBQXdCO2FBQXhCLFVBQXdCLEVBQXhCLHFCQUF3QixFQUF4QixJQUF3QjtZQUF4Qix3QkFBd0I7O1FBQzdCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNmLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxpQ0FBSyxDQUFDLE1BQUEsSUFBSSxDQUFDLEdBQUcsbUNBQUksRUFBRSxDQUFDLFNBQUssR0FBRyxPQUFDO1NBQzlELENBQUMsQ0FBQztJQUNQLENBQUM7SUFBQSxDQUFDO0lBQ0YsK0JBQVMsR0FBVDs7UUFBVSxhQUF3QjthQUF4QixVQUF3QixFQUF4QixxQkFBd0IsRUFBeEIsSUFBd0I7WUFBeEIsd0JBQXdCOztRQUM5QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDZixHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLGlDQUFLLENBQUMsTUFBQSxJQUFJLENBQUMsR0FBRyxtQ0FBSSxFQUFFLENBQUMsU0FBSyxHQUFHLE9BQUM7U0FDN0QsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUFBLENBQUM7SUFFRiwyQkFBSyxHQUFMOztRQUFNLGFBQXdCO2FBQXhCLFVBQXdCLEVBQXhCLHFCQUF3QixFQUF4QixJQUF3QjtZQUF4Qix3QkFBd0I7O1FBQzFCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNmLEdBQUcsa0NBQU0sQ0FBQyxNQUFBLElBQUksQ0FBQyxHQUFHLG1DQUFJLEVBQUUsQ0FBQyxTQUFLLEdBQUcsT0FBQztTQUNyQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBekRELElBeURDO0FBekRZLGtDQUFXO0FBeUR2QixDQUFDIn0=