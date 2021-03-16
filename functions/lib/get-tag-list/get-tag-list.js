"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = require("firebase-admin");
const encode_firebase_key_1 = __importDefault(require("../common/encode-firebase-key"));
async function getTagList(tagName) {
    const snapshot = await firebase_admin_1.firestore()
        .collection('albumsLists')
        .doc(encode_firebase_key_1.default(tagName))
        .get();
    return snapshot.data();
}
exports.default = getTagList;
//# sourceMappingURL=get-tag-list.js.map