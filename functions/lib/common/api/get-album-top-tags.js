"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_functions_1 = require("firebase-functions");
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const uniqBy_1 = __importDefault(require("lodash/uniqBy"));
const acquire_1 = __importDefault(require("../acquire"));
const assure_1 = __importDefault(require("../assure"));
const get_artist_top_tags_1 = __importDefault(require("./get-artist-top-tags"));
async function getAlbumTopTags(albumName, artistName) {
    var _a;
    firebase_functions_1.logger.debug(`album.getTopTags(${albumName}, ${artistName})`);
    assure_1.default('album.getTopTags', { albumName, artistName });
    const data = await acquire_1.default({
        album: albumName,
        artist: artistName,
        method: 'album.getTopTags',
    });
    const tags = (_a = data === null || data === void 0 ? void 0 : data.toptags) === null || _a === void 0 ? void 0 : _a.tag;
    if (isEmpty_1.default(tags)) {
        return get_artist_top_tags_1.default(artistName);
    }
    return uniqBy_1.default(tags, 'name');
}
exports.default = getAlbumTopTags;
//# sourceMappingURL=get-album-top-tags.js.map