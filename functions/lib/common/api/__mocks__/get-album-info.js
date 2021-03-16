"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Exodus___Bonded_by_Blood_json_1 = __importDefault(require("./Exodus - Bonded by Blood.json"));
const Exodus___Tempo_of_the_Damned_json_1 = __importDefault(require("./Exodus - Tempo of the Damned.json"));
const Exodus___Shovel_Headed_Kill_Machine_json_1 = __importDefault(require("./Exodus - Shovel Headed Kill Machine.json"));
const getAlbumInfo = jest
    .fn()
    .mockImplementation((albumName, artistName) => {
    if (artistName === 'Exodus') {
        switch (albumName) {
            case 'Bonded by Blood':
                return Promise.resolve(Exodus___Bonded_by_Blood_json_1.default);
            case 'Tempo of the Damned':
                return Promise.resolve(Exodus___Tempo_of_the_Damned_json_1.default);
            case 'Shovel Headed Kill Machine':
                return Promise.resolve(Exodus___Shovel_Headed_Kill_Machine_json_1.default);
            default:
                return Promise.resolve();
        }
    }
    return Promise.resolve();
});
exports.default = getAlbumInfo;
//# sourceMappingURL=get-album-info.js.map