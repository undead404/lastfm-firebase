"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = require("firebase-admin");
const firebase_functions_1 = require("firebase-functions");
const keyBy_1 = __importDefault(require("lodash/keyBy"));
const keys_1 = __importDefault(require("lodash/keys"));
const mapValues_1 = __importDefault(require("lodash/mapValues"));
const toLower_1 = __importDefault(require("lodash/toLower"));
const get_album_top_tags_1 = __importDefault(require("../common/api/get-album-top-tags"));
const sequential_async_for_each_1 = __importDefault(require("../common/sequential-async-for-each"));
const store_tags_1 = __importDefault(require("./store-tags"));
const ALBUMS_LIMIT = 100;
async function populateAlbumsTags() {
    const collection = firebase_admin_1.firestore().collection('albums');
    const albumsToPopulate = (await collection.where('tags', '==', null).limit(ALBUMS_LIMIT).get()).docs;
    await sequential_async_for_each_1.default(albumsToPopulate, async (albumSnapshot) => {
        const albumRecord = albumSnapshot.data();
        const tagsObjects = await get_album_top_tags_1.default(albumRecord.name, albumRecord.artist);
        const tags = mapValues_1.default(keyBy_1.default(tagsObjects, (tagObject) => toLower_1.default(tagObject.name)), 'count');
        const tagNames = keys_1.default(tags);
        void store_tags_1.default(tagNames).catch((error) => {
            firebase_functions_1.logger.error(error);
            throw error;
        });
        const albumUpdate = { tags };
        await collection.doc(albumSnapshot.id).update(albumUpdate);
    });
}
exports.default = populateAlbumsTags;
//# sourceMappingURL=populate-albums-tags.js.map