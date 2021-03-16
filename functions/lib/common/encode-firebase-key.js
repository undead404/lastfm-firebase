"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const replace_1 = __importDefault(require("lodash/replace"));
function encodeFirebaseKey(value) {
    let encodedValue = value;
    encodedValue = replace_1.default(encodedValue, /\./g, '%2E');
    encodedValue = replace_1.default(encodedValue, /\$/g, '%24');
    encodedValue = replace_1.default(encodedValue, /\[/g, '%5B');
    encodedValue = replace_1.default(encodedValue, /]/g, '%5D');
    encodedValue = replace_1.default(encodedValue, /#/g, '%23');
    encodedValue = replace_1.default(encodedValue, /\//g, '%2F');
    return encodedValue;
}
exports.default = encodeFirebaseKey;
//# sourceMappingURL=encode-firebase-key.js.map