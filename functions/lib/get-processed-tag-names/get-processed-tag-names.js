"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = require("firebase-admin");
const invokeMap_1 = __importDefault(require("lodash/invokeMap"));
async function getProcessedTagNames() {
    const tagNamesSnapshot = await firebase_admin_1.firestore()
        .collection('albumsLists')
        .select('name')
        .get();
    return invokeMap_1.default(tagNamesSnapshot.docs, 'get', 'name');
}
exports.default = getProcessedTagNames;
//# sourceMappingURL=get-processed-tag-names.js.map