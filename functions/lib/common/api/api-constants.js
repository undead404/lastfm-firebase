"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PARAMS = void 0;
const environment_1 = __importDefault(require("../environment"));
// eslint-disable-next-line import/prefer-default-export
exports.DEFAULT_PARAMS = {
    api_key: environment_1.default.LASTFM_API_KEY,
    autocorrect: '1',
    format: 'json',
};
//# sourceMappingURL=api-constants.js.map