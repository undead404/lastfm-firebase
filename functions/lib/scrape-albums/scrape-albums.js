"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = require("firebase-admin");
const scrape_albums_by_tag_1 = __importDefault(require("./scrape-albums-by-tag"));
async function scrapeAlbums() {
    const tagsSnapshot = await firebase_admin_1.firestore()
        .collection('tags')
        .orderBy('lastProcessedAt', 'asc')
        .limit(1)
        .get();
    const tag = tagsSnapshot.docs[0].data();
    return scrape_albums_by_tag_1.default(tag);
}
exports.default = scrapeAlbums;
//# sourceMappingURL=scrape-albums.js.map