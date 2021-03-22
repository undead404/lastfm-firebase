import { logger } from 'firebase-functions';
import size from 'lodash/size';

import mongodb from '../common/mongo-database';
import { AlbumRecord, Weighted } from '../common/types';

import pickTag from './pick-tag';
import saveList from './save-list';
import updateTimestamp from './update-timestamp';

const AVERAGE_NUMBER_OF_TRACKS = 7;
const AVERAGE_SONG_DURATION = 210;
const AVERAGE_ALBUM_DURATION = AVERAGE_SONG_DURATION * AVERAGE_NUMBER_OF_TRACKS;
const LIST_LENGTH = 100;

export default async function generateList(): Promise<void> {
  if (!mongodb.isConnected) {
    await mongodb.connect();
  }
  const tagRecord = await pickTag();
  if (!tagRecord) {
    logger.warn('Failed to find sufficient tag');
    return;
  }
  let albums: Weighted<AlbumRecord>[] | null = await mongodb.albums
    .aggregate<Weighted<AlbumRecord>>([
      {
        $match: {
          [`tags.${tagRecord.name}`]: {
            $gt: 0,
          },
        },
      },
      {
        $project: {
          _id: false,
          artist: true,
          cover: true,
          date: true,
          duration: true,
          listeners: true,
          mbid: true,
          name: true,
          numberOfTracks: true,
          playcount: true,
          tags: true,
          thumbnail: true,
          weight: {
            $multiply: [
              {
                $divide: [
                  { $ifNull: ['$playcount', 0] },
                  { $ifNull: ['$numberOfTracks', AVERAGE_NUMBER_OF_TRACKS] },
                ],
              },
              { $ifNull: ['$listeners', 0] },
              {
                $divide: [
                  { $ifNull: ['$duration', AVERAGE_ALBUM_DURATION] },
                  { $ifNull: ['$numberOfTracks', AVERAGE_NUMBER_OF_TRACKS] },
                ],
              },
              `$tags.${tagRecord.name}`,
            ],
          },
        },
      },
      {
        $sort: {
          weight: -1,
        },
      },
      { $limit: LIST_LENGTH },
      {
        $sort: {
          date: 1,
        },
      },
    ])
    .toArray();
  if (size(albums) < LIST_LENGTH) {
    logger.warn(`${size(albums)}, but required at least ${LIST_LENGTH}`);
    albums = null;
  }
  await saveList(tagRecord, albums);
  await updateTimestamp(tagRecord);
}
