"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_album_top_tags_1 = __importDefault(require("./get-album-top-tags"));
jest.mock('../lib/acquire');
jest.mock('../tags-whitelist');
jest.mock('./get-artist-top-tags');
describe('getAlbumTopTags', () => {
    it('succeeds on proper response', async () => {
        const tags = await get_album_top_tags_1.default('Tempo of the Damned', 'Exodus');
        expect(tags).not.toHaveLength(0);
    });
    it('returns empty array on a typo', async () => {
        const tags = await get_album_top_tags_1.default('Tempo of the Damned', 'Exodu');
        expect(tags).toHaveLength(0);
    });
});
//# sourceMappingURL=get-album-top-tags.test.js.map