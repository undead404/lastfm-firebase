"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forEach_1 = __importDefault(require("lodash/forEach"));
const keys_1 = __importDefault(require("lodash/keys"));
const isEqual_1 = __importDefault(require("lodash/isEqual"));
const isNil_1 = __importDefault(require("lodash/isNil"));
const uniq_1 = __importDefault(require("lodash/uniq"));
function getObjectUpdate(oldObject, newObject) {
    const diff = {};
    const objectKeys = uniq_1.default([...keys_1.default(oldObject), ...keys_1.default(newObject)]);
    forEach_1.default(objectKeys, (key) => {
        if (!isEqual_1.default(oldObject[key], newObject[key])) {
            if (isNil_1.default(newObject[key])) {
                diff[key] = null;
            }
            else {
                diff[key] = newObject[key];
            }
        }
    });
    return diff;
}
exports.default = getObjectUpdate;
//# sourceMappingURL=get-object-update.js.map