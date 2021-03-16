"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = require("firebase-admin");
const size_1 = __importDefault(require("lodash/size"));
const sumBy_1 = __importDefault(require("lodash/sumBy"));
const toNumber_1 = __importDefault(require("lodash/toNumber"));
const get_album_info_1 = __importDefault(require("../common/api/get-album-info"));
const sequential_async_for_each_1 = __importDefault(require("../common/sequential-async-for-each"));
const ALBUMS_LIMIT = 100;
async function populateAlbumsStats() {
    const collection = firebase_admin_1.firestore().collection('albums');
    const albumsToPopulate = (await collection.where('listeners', '==', null).limit(ALBUMS_LIMIT).get()).docs;
    await sequential_async_for_each_1.default(albumsToPopulate, async (albumSnapshot) => {
        const albumRecord = albumSnapshot.data();
        const albumInfo = await get_album_info_1.default(albumRecord.name, albumRecord.artist);
        if (albumInfo) {
            const albumUpdate = {
                duration: sumBy_1.default(albumInfo.tracks.track, (track) => toNumber_1.default(track.duration)) ||
                    null,
                listeners: toNumber_1.default(albumInfo.listeners),
                numberOfTracks: size_1.default(albumInfo.tracks.track) || null,
                playcount: toNumber_1.default(albumInfo.playcount),
            };
            await collection.doc(albumSnapshot.id).update(albumUpdate);
        }
    });
}
exports.default = populateAlbumsStats;
//# sourceMappingURL=populate-albums-stats.js.map