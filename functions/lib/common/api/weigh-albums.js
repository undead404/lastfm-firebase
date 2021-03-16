"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_functions_1 = require("firebase-functions");
const sequential_async_map_1 = __importDefault(require("../sequential-async-map"));
const get_album_tag_count_1 = __importDefault(require("./get-album-tag-count"));
const get_album_weight_1 = __importDefault(require("./get-album-weight"));
async function weighAlbums(albums, tagName) {
    firebase_functions_1.logger.debug(`weighAlbums: [...], ${tagName}`);
    if (!albums) {
        return [];
    }
    return sequential_async_map_1.default(albums, async (albumInfo) => {
        const weight = get_album_weight_1.default(albumInfo) *
            (await get_album_tag_count_1.default(albumInfo.name, albumInfo.artist, tagName));
        return Object.assign(Object.assign({}, albumInfo), { weight });
    });
}
exports.default = weighAlbums;
//# sourceMappingURL=weigh-albums.js.map