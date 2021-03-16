"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = require("firebase-admin");
const map_1 = __importDefault(require("lodash/map"));
const encode_firebase_key_1 = __importDefault(require("../common/encode-firebase-key"));
async function storeTags(tagNames) {
    const collection = firebase_admin_1.firestore().collection('tags');
    await Promise.all(map_1.default(tagNames, async (tagName) => {
        const reference = collection.doc(encode_firebase_key_1.default(tagName));
        const snapshot = await reference.get();
        if (!snapshot.exists) {
            const tagRecord = {
                lastProcessedAt: null,
                name: tagName,
            };
            await reference.set(tagRecord);
        }
    }));
}
exports.default = storeTags;
//# sourceMappingURL=store-tags.js.map