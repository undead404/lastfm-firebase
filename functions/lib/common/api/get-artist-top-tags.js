"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_functions_1 = require("firebase-functions");
const uniqBy_1 = __importDefault(require("lodash/uniqBy"));
const acquire_1 = __importDefault(require("../acquire"));
const assure_1 = __importDefault(require("../assure"));
async function getArtistTopTags(artistName) {
    var _a;
    firebase_functions_1.logger.debug(`artist.getTopTags(${artistName})`);
    assure_1.default('artist.getTopTags', { artistName });
    const data = await acquire_1.default({
        artist: artistName,
        method: 'artist.getTopTags',
    });
    const tags = (_a = data === null || data === void 0 ? void 0 : data.toptags) === null || _a === void 0 ? void 0 : _a.tag;
    return uniqBy_1.default(tags, 'name');
}
exports.default = getArtistTopTags;
//# sourceMappingURL=get-artist-top-tags.js.map