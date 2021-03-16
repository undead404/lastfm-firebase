"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getArtistTopTags = jest.fn().mockImplementation((artistName) => {
    if (artistName === 'Exodus') {
        return Promise.resolve([
            {
                count: 100,
                name: 'thrash metal',
            },
            { count: 19, name: 'metal' },
            {
                count: 19,
                name: 'speed metal',
            },
        ]);
    }
    return Promise.resolve([]);
});
exports.default = getArtistTopTags;
//# sourceMappingURL=get-artist-top-tags.js.map