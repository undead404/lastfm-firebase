"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reduce_1 = __importDefault(require("lodash/reduce"));
async function sequentialAsyncForEach(collection, f) {
    return reduce_1.default(collection, async (accumulator, item) => {
        await accumulator;
        await f(item);
    }, Promise.resolve());
}
exports.default = sequentialAsyncForEach;
//# sourceMappingURL=sequential-async-for-each.js.map