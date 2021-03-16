"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_artist_top_tags_1 = __importDefault(require("./get-artist-top-tags"));
jest.mock('../lib/acquire');
describe('getArtistTopTags', () => {
    it('returns empty array on typo', async () => {
        const tags = await get_artist_top_tags_1.default('Exodu');
        expect(tags).toHaveLength(0);
    });
    it('collects all pages', async () => {
        const tags = await get_artist_top_tags_1.default('Exodus');
        expect(tags).not.toHaveLength(0);
    });
});
//# sourceMappingURL=get-artist-top-tags.test.js.map