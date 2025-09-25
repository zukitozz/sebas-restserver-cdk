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
exports.JsonError = exports.MissingFieldException = void 0;
exports.validateAsBillingEntry = validateAsBillingEntry;
var MissingFieldException = /** @class */ (function (_super) {
    __extends(MissingFieldException, _super);
    function MissingFieldException(missingField) {
        return _super.call(this, "Missing field: ".concat(missingField)) || this;
    }
    return MissingFieldException;
}(Error));
exports.MissingFieldException = MissingFieldException;
var JsonError = /** @class */ (function (_super) {
    __extends(JsonError, _super);
    function JsonError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return JsonError;
}(Error));
exports.JsonError = JsonError;
function validateAsBillingEntry(arg) {
    if (arg.receptor === undefined) {
        throw new MissingFieldException('idReceptor');
    }
    if (arg.usuario === undefined) {
        throw new MissingFieldException('idUsuario');
    }
    if (arg.tipo_comprobante === undefined) {
        throw new MissingFieldException('tipo_comprobante');
    }
    if (arg.items === undefined || arg.items.length === 0) {
        throw new MissingFieldException('items');
    }
}
