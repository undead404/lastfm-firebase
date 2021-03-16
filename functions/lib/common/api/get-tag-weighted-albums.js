"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_functions_1 = require("firebase-functions");
const orderBy_1 = __importDefault(require("lodash/orderBy"));
const reject_1 = __importDefault(require("lodash/reject"));
const uniqBy_1 = __importDefault(require("lodash/uniqBy"));
const get_tag_top_albums_1 = __importDefault(require("./get-tag-top-albums"));
const weigh_albums_1 = __importDefault(require("./weigh-albums"));
async function getTagWeightedAlbums(tagName) {
    firebase_functions_1.logger.debug(`getTagWeightedAlbums(${tagName})`);
    const albums = await get_tag_top_albums_1.default(tagName);
    const weightedAlbums = await weigh_albums_1.default(albums, tagName);
    return uniqBy_1.default(orderBy_1.default(reject_1.default(weightedAlbums, ['weight', 0]), ['weight'], ['desc']), (album) => `${album.artist} - ${album.name}`);
}
exports.default = getTagWeightedAlbums;
//# sourceMappingURL=get-tag-weighted-albums.js.map