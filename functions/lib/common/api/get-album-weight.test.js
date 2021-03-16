"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_album_weight_1 = __importDefault(require("./get-album-weight"));
describe('getAlbumWeight', () => {
    it('returns zero on empty input', () => {
        const albumWeight = get_album_weight_1.default();
        expect(albumWeight).toEqual(0);
    });
    it('returns zero on zero playcount', () => {
        const albumWeight = get_album_weight_1.default({
            artist: 'Exodus',
            listeners: '1',
            name: 'Tempo of the Damned',
            playcount: '0',
            tracks: {
                track: [],
            },
        });
        expect(albumWeight).toEqual(0);
    });
    it('returns meaningful weight on unknown tracks', () => {
        const albumWeight = get_album_weight_1.default({
            artist: 'Exodus',
            listeners: '1',
            name: 'Tempo of the Damned',
            playcount: '7',
            tracks: {
                track: [],
            },
        });
        expect(albumWeight).toEqual(7);
    });
    it('returns meaningful weight on known tracks', () => {
        const albumWeight = get_album_weight_1.default({
            artist: 'Exodus',
            listeners: '1',
            name: 'Tempo of the Damned',
            playcount: '3',
            tracks: {
                track: [{ duration: '1' }, { duration: '2' }, { duration: '3' }],
            },
        });
        expect(albumWeight).toEqual(3);
    });
});
//# sourceMappingURL=get-album-weight.test.js.map