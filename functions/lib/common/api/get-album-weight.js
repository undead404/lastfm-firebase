"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_functions_1 = require("firebase-functions");
const map_1 = __importDefault(require("lodash/map"));
const size_1 = __importDefault(require("lodash/size"));
const sum_1 = __importDefault(require("lodash/sum"));
const toNumber_1 = __importDefault(require("lodash/toNumber"));
const AVERAGE_NUMBER_OF_TRACKS = 7;
const AVERAGE_SONG_DURATION = 210;
function getAlbumWeight(albumInfo) {
    firebase_functions_1.logger.debug(`getAlbumWeight: ${albumInfo === null || albumInfo === void 0 ? void 0 : albumInfo.artist} - ${albumInfo === null || albumInfo === void 0 ? void 0 : albumInfo.name}`);
    if (!albumInfo) {
        return 0;
    }
    const numberOfTracks = size_1.default(albumInfo.tracks.track) || AVERAGE_NUMBER_OF_TRACKS;
    const listeners = toNumber_1.default(albumInfo.listeners);
    const playcount = toNumber_1.default(albumInfo.playcount);
    if (!listeners || !playcount) {
        return 0;
    }
    const averageSongDuration = sum_1.default(map_1.default(albumInfo.tracks.track, (track) => toNumber_1.default(track.duration))) /
        numberOfTracks || AVERAGE_SONG_DURATION;
    return (
    // (((playcount / listeners) * playcount) / numberOfTracks) *
    //   averageSongDuration || 0
    ((playcount * listeners) / numberOfTracks) * averageSongDuration || 0);
}
exports.default = getAlbumWeight;
//# sourceMappingURL=get-album-weight.js.map