"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = __importDefault(require("lodash/get"));
const encode_firebase_key_1 = __importDefault(require("../common/encode-firebase-key"));
const AVERAGE_NUMBER_OF_TRACKS = 7;
const AVERAGE_SONG_DURATION = 210;
const AVERAGE_ALBUM_DURATION = AVERAGE_SONG_DURATION * AVERAGE_NUMBER_OF_TRACKS;
function weighAlbum(album, tagName) {
    let weight = 0;
    if (album.playcount && album.listeners) {
        const averageSongDuration = (album.duration || AVERAGE_ALBUM_DURATION) /
            (album.numberOfTracks || AVERAGE_NUMBER_OF_TRACKS);
        weight =
            ((album.playcount * album.listeners) /
                (album.numberOfTracks || AVERAGE_NUMBER_OF_TRACKS)) *
                averageSongDuration *
                get_1.default(album, `tags.${encode_firebase_key_1.default(tagName)}`, 0) || 0;
    }
    return Object.assign(Object.assign({}, album), { weight });
}
exports.default = weighAlbum;
//# sourceMappingURL=weigh-album.js.map