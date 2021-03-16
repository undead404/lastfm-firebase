"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_album_tag_count_1 = __importDefault(require("./get-album-tag-count"));
jest.mock('./get-album-top-tags');
describe('getAlbumTagCount', () => {
    it('calculates', async () => {
        const tagCount = await get_album_tag_count_1.default('Tempo of the Damned', 'Exodus', 'thrash metal');
        expect(tagCount).toEqual(100);
    });
    it('returns zero on typo', async () => {
        const tagCount = await get_album_tag_count_1.default('Tempo of the Damned', 'Exodu', 'thrash metal');
        expect(tagCount).toEqual(0);
    });
});
//# sourceMappingURL=get-album-tag-count.test.js.map