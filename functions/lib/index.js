"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeAlbums = exports.generateList = exports.populateAlbumsTags = exports.populateAlbumsStats = exports.getProcessedTagNames = exports.getTagList = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const firebase_functions_1 = require("firebase-functions");
const generate_list_1 = __importDefault(require("./generate-list/generate-list"));
const get_processed_tag_names_1 = __importDefault(require("./get-processed-tag-names/get-processed-tag-names"));
const get_tag_list_1 = __importDefault(require("./get-tag-list/get-tag-list"));
const populate_albums_stats_1 = __importDefault(require("./populate-albums-stats/populate-albums-stats"));
const populate_albums_tags_1 = __importDefault(require("./populate-albums-tags/populate-albums-tags"));
const scrape_albums_1 = __importDefault(require("./scrape-albums/scrape-albums"));
firebase_admin_1.default.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.getTagList = firebase_functions_1.https.onCall(async (data) => ({
    tagList: await get_tag_list_1.default(data.tagName),
}));
exports.getProcessedTagNames = firebase_functions_1.https.onCall(async () => ({
    tags: await get_processed_tag_names_1.default(),
}));
exports.populateAlbumsStats = firebase_functions_1.pubsub
    .schedule('0 * * * *')
    .onRun(async () => {
    try {
        await populate_albums_stats_1.default();
        return null;
    }
    catch (error) {
        firebase_functions_1.logger.error(error);
        throw error;
    }
});
exports.populateAlbumsTags = firebase_functions_1.pubsub
    .schedule('30 * * * *')
    .onRun(async () => {
    try {
        await populate_albums_tags_1.default();
        return null;
    }
    catch (error) {
        firebase_functions_1.logger.error(error);
        throw error;
    }
});
exports.generateList = firebase_functions_1.pubsub.schedule('15 * * * *').onRun(async () => {
    try {
        await generate_list_1.default();
        return null;
    }
    catch (error) {
        firebase_functions_1.logger.error(error);
        throw error;
    }
});
exports.scrapeAlbums = firebase_functions_1.runWith({
    memory: '1GB',
    timeoutSeconds: 540,
})
    .pubsub.schedule('0 3 * * *')
    .onRun(async () => {
    try {
        await scrape_albums_1.default();
        return null;
    }
    catch (error) {
        firebase_functions_1.logger.error(error);
        throw error;
    }
});
//# sourceMappingURL=index.js.map