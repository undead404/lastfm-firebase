"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const map_1 = __importDefault(require("lodash/map"));
const orderBy_1 = __importDefault(require("lodash/orderBy"));
const size_1 = __importDefault(require("lodash/size"));
const take_1 = __importDefault(require("lodash/take"));
const weigh_album_1 = __importDefault(require("./weigh-album"));
function selectAlbums(albums, tagName, n) {
    if (size_1.default(albums) < n) {
        return null;
    }
    return take_1.default(orderBy_1.default(map_1.default(albums, (album) => weigh_album_1.default(album, tagName)), ['weight'], ['desc']), n);
}
exports.default = selectAlbums;
//# sourceMappingURL=select-albums.js.map