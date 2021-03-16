"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_functions_1 = require("firebase-functions");
const compact_1 = __importDefault(require("lodash/compact"));
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const reject_1 = __importDefault(require("lodash/reject"));
const uniqBy_1 = __importDefault(require("lodash/uniqBy"));
const acquire_1 = __importDefault(require("../acquire"));
const assure_1 = __importDefault(require("../assure"));
const sequential_async_map_1 = __importDefault(require("../sequential-async-map"));
const get_album_info_1 = __importDefault(require("./get-album-info"));
// const DEFAULT_PAGE_LIMIT = 200;
const DEFAULT_PAGE_LIMIT = 4;
async function getArtistTopAlbums(artistName) {
    var _a;
    firebase_functions_1.logger.debug(`artist.getTopAlbums(${artistName})`);
    assure_1.default('artist.getTopAlbums', { artistName });
    let currentPage = 1;
    let albums = [];
    while (currentPage <= DEFAULT_PAGE_LIMIT) {
        // eslint-disable-next-line no-await-in-loop
        const data = await acquire_1.default({
            artist: artistName,
            method: 'artist.getTopAlbums',
            page: currentPage,
        });
        const currentAlbums = reject_1.default((_a = data === null || data === void 0 ? void 0 : data.topalbums) === null || _a === void 0 ? void 0 : _a.album, ['name', '(null)']);
        if (isEmpty_1.default(currentAlbums)) {
            break;
        }
        // eslint-disable-next-line no-await-in-loop
        const albumInfos = await sequential_async_map_1.default(currentAlbums, (albumItem) => get_album_info_1.default(albumItem.name, albumItem.artist.name));
        albums = [...albums, ...compact_1.default(uniqBy_1.default(albumInfos, 'name'))];
        currentPage += 1;
    }
    return albums;
}
exports.default = getArtistTopAlbums;
//# sourceMappingURL=get-artist-top-albums.js.map