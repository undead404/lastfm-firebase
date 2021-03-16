"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getAlbumTopTags = jest
    .fn()
    .mockImplementation((albumName, artistName) => {
    if (albumName === 'Tempo of the Damned' && artistName === 'Exodus') {
        return [
            {
                count: 100,
                name: 'thrash metal',
            },
            {
                count: 25,
                name: 'albums I own',
            },
            {
                count: 22,
                name: 'heavy metal',
            },
            { count: 14, name: 'metal' },
        ];
    }
    return [];
});
exports.default = getAlbumTopTags;
//# sourceMappingURL=get-album-top-tags.js.map