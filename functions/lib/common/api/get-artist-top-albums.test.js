"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_artist_top_albums_1 = __importDefault(require("./get-artist-top-albums"));
jest.mock('../lib/acquire');
jest.mock('./get-album-info');
describe('getArtistTopAlbums', () => {
    it('returns empty array on typo', async () => {
        const albums = await get_artist_top_albums_1.default('Exodu');
        expect(albums).toHaveLength(0);
    });
    it('collects all pages', async () => {
        const albums = await get_artist_top_albums_1.default('Exodus');
        expect(albums).toHaveLength(3);
    });
});
//# sourceMappingURL=get-artist-top-albums.test.js.map