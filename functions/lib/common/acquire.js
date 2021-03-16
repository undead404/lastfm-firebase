"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const firebase_functions_1 = require("firebase-functions");
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const query_string_1 = require("query-string");
const api_constants_1 = require("./api/api-constants");
const constants_1 = require("./constants");
const sleep_1 = __importDefault(require("./sleep"));
async function acquire(parameters, retry = 0) {
    var _a;
    const url = `https://ws.audioscrobbler.com/2.0/?${query_string_1.stringify(Object.assign(Object.assign({}, api_constants_1.DEFAULT_PARAMS), parameters))}`;
    firebase_functions_1.logger.warn(url);
    try {
        const response = await axios_1.default.get(url, { timeout: 2000 });
        if (isEmpty_1.default(response === null || response === void 0 ? void 0 : response.data)) {
            throw new Error(((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.message) || 'Empty response');
        }
        else if (response.data.error || isEmpty_1.default(response.data)) {
            if (response.data.error === constants_1.LASTFM_API_ERRORS.INVALID_PARAMETERS) {
                firebase_functions_1.logger.warn(response.data.message);
                return null;
            }
            throw new Error(response.data.message || 'Empty response');
        }
        return response.data;
    }
    catch (error) {
        firebase_functions_1.logger.error(error);
        if (retry >= constants_1.MAX_RETRIES) {
            throw error;
        }
        firebase_functions_1.logger.warn(`retry #${retry + 1}`);
        // eslint-disable-next-line no-magic-numbers
        if (process.env.NODE_ENV !== 'test')
            await sleep_1.default(2 ** retry * 1000);
        return acquire(parameters, retry + 1);
    }
}
exports.default = acquire;
//# sourceMappingURL=acquire.js.map