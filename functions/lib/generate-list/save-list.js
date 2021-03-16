"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = require("firebase-admin");
const encode_firebase_key_1 = __importDefault(require("../common/encode-firebase-key"));
function saveList(tagRecord, albums) {
    const list = {
        albums,
        createdAt: firebase_admin_1.firestore.FieldValue.serverTimestamp(),
        name: tagRecord.name,
    };
    return firebase_admin_1.firestore()
        .collection('albumsLists')
        .doc(encode_firebase_key_1.default(tagRecord.name))
        .set(list);
}
exports.default = saveList;
//# sourceMappingURL=save-list.js.map