"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_functions_1 = require("firebase-functions");
const acquire_1 = __importDefault(require("../acquire"));
const assure_1 = __importDefault(require("../assure"));
async function getAlbumInfo(albumName, artistName) {
    firebase_functions_1.logger.debug(`album.getInfo(${albumName}, ${artistName})`);
    assure_1.default('album.getInfo', { albumName, artistName });
    const data = await acquire_1.default({
        album: albumName,
        artist: artistName,
        method: 'album.getInfo',
    });
    return data === null || data === void 0 ? void 0 : data.album;
}
exports.default = getAlbumInfo;
//# sourceMappingURL=get-album-info.js.map