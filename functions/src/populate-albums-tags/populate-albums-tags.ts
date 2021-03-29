import { PubSub } from '@google-cloud/pubsub';
import { logger } from 'firebase-functions';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import pickBy from 'lodash/pickBy';
import toInteger from 'lodash/toInteger';
import toLower from 'lodash/toLower';
import toString from 'lodash/toString';
import { WithId } from 'mongodb';

import getAlbumTopTags from '../common/lastfm/get-album-top-tags';
import mongodb from '../common/mongo-database';
import sequentialAsyncForEach from '../common/sequential-async-for-each';
import { AlbumRecord } from '../common/types';

const storeTagsTopic = new PubSub().topic('store-tags');

const ALBUMS_LIMIT = 500;
const TRILLION = 1_000_000_000_000;

export default async function populateAlbumsTags(): Promise<void> {
  if (!mongodb.isConnected) {
    await mongodb.connect();
  }
  const albums = (await mongodb.albums
    .find({
      listeners: {
        $ne: null,
      },
      tags: null,
    })
    .limit(ALBUMS_LIMIT)
    .toArray()) as WithId<AlbumRecord>[];
  await sequentialAsyncForEach(albums, async (album) => {
    const tagsObjects = await getAlbumTopTags(album.name, album.artist);
    const tags = pickBy(
      mapValues(
        keyBy(tagsObjects, (tagObject) => toLower(tagObject.name)),
        'count',
      ),
      (tagCount) => tagCount > 1,
    );
    storeTagsTopic
      .publish(
        Buffer.from(
          JSON.stringify(
            mapValues(tags, (tagCount) =>
              toString(
                toInteger(
                  (tagCount * (album.playcount || 0) * (album.listeners || 0)) /
                    TRILLION,
                ),
              ),
            ),
          ),
        ),
      )
      .then(() => logger.info('Successfully published to store-tags topic'))
      .catch((error) => logger.error(error));
    const albumUpdate: Partial<AlbumRecord> = { tags };
    await mongodb.albums.updateOne({ _id: album._id }, { $set: albumUpdate });
  });
}
