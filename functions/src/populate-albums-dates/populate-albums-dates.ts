import { logger } from 'firebase-functions';
import get from 'lodash/get';
import startsWith from 'lodash/startsWith';
import { WithId } from 'mongodb';
import { MusicBrainzApi } from 'musicbrainz-api';

import mongodb from '../common/mongo-database';
import sequentialAsyncForEach from '../common/sequential-async-for-each';
import sleep from '../common/sleep';
import { AlbumRecord } from '../common/types';

const LIMIT = 500;

const API_DELAY_MS = 200;

export default async function populateAlbumsDates(): Promise<void> {
  if (!mongodb.isConnected) {
    await mongodb.connect();
  }
  const musicbrainz = new MusicBrainzApi({
    appContactInfo: 'brute18@gmail.com',
    appName: 'lastfm-analysis',
    appVersion: '0.1.0',
  });
  const albums = (await mongodb.albums
    .find({
      date: { $exists: false },
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
    try {
      const release = await musicbrainz.getRelease(album.mbid, [
        'release-groups',
      ]);
      const date =
        get(release, 'release-group.first-release-date') ||
        get(release, 'date');
      if (date) {
        const albumUpdate: Partial<AlbumRecord> = {
          date,
        };
        await mongodb.albums.updateOne(
          { _id: album._id },
          { $set: albumUpdate },
        );
      }
    } catch (error) {
      if (startsWith(error.message, 'Got response status 404')) {
        await mongodb.albums.updateOne(
          {
            _id: album._id,
          },
          { $set: { date: null } },
        );
      }
      logger.error(`Failed to get date for: ${album.artist} - ${album.name}`);
    }
    await sleep(API_DELAY_MS);
  });
}
