"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = require("firebase-admin");
const invokeMap_1 = __importDefault(require("lodash/invokeMap"));
const pick_tag_1 = __importDefault(require("./pick-tag"));
const save_list_1 = __importDefault(require("./save-list"));
const select_albums_1 = __importDefault(require("./select-albums"));
const update_timestamp_1 = __importDefault(require("./update-timestamp"));
const LIST_LENGTH = 10;
async function generateList() {
    const tagRecord = await pick_tag_1.default();
    const albumsSnapshot = await firebase_admin_1.firestore()
        .collection('albums')
        .where(`tags.${tagRecord.name}`, '>', 0)
        .get();
    const albums = invokeMap_1.default(albumsSnapshot.docs, 'data');
    const topAlbums = select_albums_1.default(albums, tagRecord.name, LIST_LENGTH);
    await save_list_1.default(tagRecord, topAlbums);
    await update_timestamp_1.default(tagRecord);
}
exports.default = generateList;
//# sourceMappingURL=generate-list.js.map