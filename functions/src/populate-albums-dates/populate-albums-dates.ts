import get from 'lodash/get';
import { WithId } from 'mongodb';
import MongoDatabase from '../common/mongo-database';

import getReleaseInfo from '../common/musicbrainz/get-release-info';
import sequentialAsyncForEach from '../common/sequential-async-for-each';
import { AlbumRecord } from '../common/types';

const LIMIT = 1000;

export default async function populateAlbumsDates(): Promise<void> {
  const mongodb = new MongoDatabase();
  await mongodb.connect();
  try {
    const albums = (await mongodb.albums
      .find({
        date: null,
        mbid: {
          $ne: null,
        },
      })
      .sort({
        listeners: -1,
      })
      .limit(LIMIT)
      .toArray()) as WithId<AlbumRecord>[];
    await sequentialAsyncForEach(albums, async (album) => {
      if (!album.mbid) {
        return;
      }
      const releaseInfo = await getReleaseInfo(album.mbid);
      const date =
        get(releaseInfo, 'release-group.first-release-date') ||
        get(releaseInfo, 'date');
      if (date) {
        const albumUpdate: Partial<AlbumRecord> = {
          date,
        };
        await mongodb.albums.updateOne(
          { _id: album._id },
          { $set: albumUpdate },
        );
      }
    });
  } finally {
    await mongodb.close();
  }
}
