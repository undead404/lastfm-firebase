"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = require("firebase-admin");
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const map_1 = __importDefault(require("lodash/map"));
const uuid_1 = require("uuid");
const get_tag_top_albums_1 = __importDefault(require("../common/api/get-tag-top-albums"));
const encode_firebase_key_1 = __importDefault(require("../common/encode-firebase-key"));
const get_object_update_1 = __importDefault(require("./get-object-update"));
async function scrapeAlbumsByTag(tag) {
    const albums = await get_tag_top_albums_1.default(tag.name);
    const albumsRecords = map_1.default(albums, (album) => ({
        artist: album.artist,
        duration: null,
        mbid: album.mbid || null,
        listeners: null,
        name: album.name,
        numberOfTracks: null,
        playcount: null,
        tags: null,
    }));
    const collection = firebase_admin_1.firestore().collection('albums');
    await Promise.all(map_1.default(albumsRecords, async (albumRecord) => {
        if (albumRecord.mbid) {
            await collection.doc(albumRecord.mbid).set(albumRecord);
            return;
        }
        const snapshot = await collection
            .where('artist', '==', albumRecord.artist)
            .where('name', '==', albumRecord.name)
            .get();
        if (snapshot.empty) {
            const id = uuid_1.v4();
            await collection.doc(id).set(albumRecord);
        }
        else {
            const document = snapshot.docs[0];
            const recordedAlbumRecord = document.data();
            const albumRecordUpdate = get_object_update_1.default(recordedAlbumRecord, albumRecord);
            if (!isEmpty_1.default(albumRecordUpdate)) {
                await collection.doc(document.id).update(albumRecordUpdate);
            }
        }
    }));
    await firebase_admin_1.firestore().collection('tags').doc(encode_firebase_key_1.default(tag.name)).update({
        lastProcessedAt: firebase_admin_1.firestore.FieldValue.serverTimestamp(),
    });
}
exports.default = scrapeAlbumsByTag;
//# sourceMappingURL=scrape-albums-by-tag.js.map