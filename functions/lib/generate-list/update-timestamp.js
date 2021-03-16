"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = require("firebase-admin");
const encode_firebase_key_1 = __importDefault(require("../common/encode-firebase-key"));
function updateTimestamp(tagRecord) {
    return firebase_admin_1.firestore()
        .collection('tags')
        .doc(encode_firebase_key_1.default(tagRecord.name))
        .update({
        lastProcessedAt: firebase_admin_1.firestore.FieldValue.serverTimestamp(),
    });
}
exports.default = updateTimestamp;
//# sourceMappingURL=update-timestamp.js.map