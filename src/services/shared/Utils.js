"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomId = createRandomId;
exports.parseJSON = parseJSON;
var Validators_1 = require("./Validators");
var uuid_1 = require("uuid");
function createRandomId() {
    return (0, uuid_1.v4)();
}
function parseJSON(arg) {
    try {
        return JSON.parse(arg);
    }
    catch (error) {
        throw new Validators_1.JsonError(error.message);
    }
}
