"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_functions_1 = require("firebase-functions");
const find_1 = __importDefault(require("lodash/find"));
const toLower_1 = __importDefault(require("lodash/toLower"));
const assure_1 = __importDefault(require("../assure"));
const get_album_top_tags_1 = __importDefault(require("./get-album-top-tags"));
async function getAlbumTagCount(albumName, artistName, tagName) {
    firebase_functions_1.logger.debug(`getAlbumTagCount(${albumName}, ${artistName}, ${tagName})`);
    assure_1.default('getAlbumTagCount', { albumName, artistName, tagName });
    const albumTags = await get_album_top_tags_1.default(albumName, artistName);
    const tagObject = find_1.default(albumTags, (tagItem) => toLower_1.default(tagItem.name) === toLower_1.default(tagName));
    if (!tagObject) {
        return 0;
    }
    return tagObject.count;
}
exports.default = getAlbumTagCount;
//# sourceMappingURL=get-album-tag-count.js.map