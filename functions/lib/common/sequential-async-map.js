"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reduce_1 = __importDefault(require("lodash/reduce"));
async function sequentialAsyncMap(collection, f) {
    return reduce_1.default(collection, async (accumulator, item) => [...(await accumulator), await f(item)], Promise.resolve([]));
}
exports.default = sequentialAsyncMap;
//# sourceMappingURL=sequential-async-map.js.map