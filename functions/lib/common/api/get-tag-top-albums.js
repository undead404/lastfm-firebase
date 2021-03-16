"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_functions_1 = require("firebase-functions");
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const map_1 = __importDefault(require("lodash/map"));
const reject_1 = __importDefault(require("lodash/reject"));
const acquire_1 = __importDefault(require("../acquire"));
const assure_1 = __importDefault(require("../assure"));
const MAX_PAGE_AVAILABLE = 200;
async function getTagTopAlbums(tagName) {
    var _a;
    firebase_functions_1.logger.debug(`tag.getTopAlbums(${tagName})`);
    assure_1.default('tag.getTopAlbums', { tagName });
    let currentPage = 1;
    let albums = [];
    while (currentPage <= MAX_PAGE_AVAILABLE) {
        // eslint-disable-next-line no-await-in-loop
        const data = await acquire_1.default({
            method: 'tag.getTopAlbums',
            page: currentPage,
            tag: tagName,
        });
        const currentAlbums = map_1.default(reject_1.default((_a = data === null || data === void 0 ? void 0 : data.albums) === null || _a === void 0 ? void 0 : _a.album, ['name', '(null)']), (album) => ({
            artist: album.artist.name,
            mbid: album.mbid,
            name: album.name,
        }));
        if (isEmpty_1.default(currentAlbums)) {
            break;
        }
        // eslint-disable-next-line no-await-in-loop
        // const albumInfos = await sequentialAsyncMap(currentAlbums, (albumItem) =>
        //   getAlbumInfo(albumItem.name, albumItem.artist.name),
        // );
        // albums = [...albums, ...compact(uniqBy(albums, 'name'))];
        albums = [...albums, ...currentAlbums];
        currentPage += 1;
    }
    return albums;
}
exports.default = getTagTopAlbums;
//# sourceMappingURL=get-tag-top-albums.js.map