"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forEach_1 = __importDefault(require("lodash/forEach"));
function assure(where, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
values) {
    forEach_1.default(values, (value, key) => {
        if (!value) {
            throw new Error(`No ${key} supplied to ${where}`);
        }
    });
}
exports.default = assure;
//# sourceMappingURL=assure.js.map