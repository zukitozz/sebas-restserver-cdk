"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppException = void 0;
var AppException = /** @class */ (function (_super) {
    __extends(AppException, _super);
    function AppException(message, exception, code) {
        if (code === void 0) { code = '0000'; }
        var _this = _super.call(this) || this;
        if (!code || !message) {
            throw new Error('AppException - Code and message are required');
        }
        _this.code = code;
        _this.message = message;
        _this.name = 'AppException';
        return _this;
    }
    AppException.prototype.getCode = function () {
        return this.code;
    };
    AppException.prototype.throw = function (condition) {
        var appException = this;
        if (typeof condition === 'undefined') {
            throw appException;
        }
        if (condition instanceof Function) {
            if (condition()) {
                throw appException;
            }
        }
        if (condition) {
            throw appException;
        }
    };
    return AppException;
}(Error));
exports.AppException = AppException;
