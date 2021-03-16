"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getAlbumTagCount = jest
    .fn()
    .mockImplementation((albumName, artistName, tagName) => {
    if (artistName === 'Exodus' && tagName === 'thrash metal') {
        return Promise.resolve(100);
    }
    return Promise.resolve(0);
});
exports.default = getAlbumTagCount;
//# sourceMappingURL=get-album-tag-count.js.map