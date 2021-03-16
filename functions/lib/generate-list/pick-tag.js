"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = require("firebase-admin");
async function pickTag() {
    const tagsCollection = firebase_admin_1.firestore().collection('tags');
    const tagsSnapshot = await tagsCollection
        .orderBy('lastProcessedAt', 'asc')
        .limit(1)
        .get();
    return tagsSnapshot.docs[0].data();
}
exports.default = pickTag;
//# sourceMappingURL=pick-tag.js.map