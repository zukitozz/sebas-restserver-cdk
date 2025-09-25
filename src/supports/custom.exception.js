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
var app_exception_1 = require("./app.exception");
var CustomException = /** @class */ (function (_super) {
    __extends(CustomException, _super);
    function CustomException(error) {
        var _this = _super.call(this, error.message, error.exception, error.code) || this;
        _this.name = 'CustomException';
        _this.message = error.message;
        _this.httpStatus = _this.getHttpStatusVal(error.httpStatus);
        _this.details = _this.formatDetails(error.details);
        return _this;
    }
    CustomException.prototype.formatDetails = function (details) {
        if (details) {
            return Array.isArray(details) ? details : [details];
        }
        else {
            return [];
        }
    };
    CustomException.prototype.getHttpStatusVal = function (httpStatus) {
        return httpStatus !== null && httpStatus !== void 0 ? httpStatus : 500;
    };
    CustomException.prototype.getHttpStatus = function () {
        return this.httpStatus;
    };
    CustomException.prototype.getDetails = function () {
        return this.details;
    };
    return CustomException;
}(app_exception_1.AppException));
exports.default = CustomException;
