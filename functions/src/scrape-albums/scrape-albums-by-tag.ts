import map from 'lodash/map';

import getTagTopAlbums from '../common/lastfm/get-tag-top-albums';
import MongoDatabase from '../common/mongo-database';
import { AlbumRecord, TagRecord } from '../common/types';

export default async function scrapeAlbumsByTag(
  mongodb: MongoDatabase,
  tag: TagRecord,
): Promise<void> {
  const albums = await getTagTopAlbums(tag.name);
  const albumsRecords = map(
    albums,
    (album): AlbumRecord => ({
      artist: album.artist,
      cover: null,
      date: null,
      duration: null,
      mbid: album.mbid || null,
      listeners: null,
      name: album.name,
      numberOfTracks: null,
      playcount: null,
      tags: null,
      thumbnail: null,
    }),
  );
  await mongodb.albums.bulkWrite(
    map(albumsRecords, (albumRecord) => ({
      updateOne: {
        filter: { artist: albumRecord.artist, name: albumRecord.name },
        update: { $set: albumRecord },
        upsert: true,
      },
    })),
  );
  const tagUpdate: Partial<TagRecord> = {
    lastProcessedAt: new Date(),
  };
  await mongodb.tags.updateOne({ name: tag.name }, { $set: tagUpdate });
}
