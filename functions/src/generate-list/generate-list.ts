import size from 'lodash/size';

import MongoDatabase from '../common/mongo-database';
import { AlbumRecord } from '../common/types';

import pickTag from './pick-tag';
import saveList from './save-list';
import updateTimestamp from './update-timestamp';

const AVERAGE_NUMBER_OF_TRACKS = 7;
const AVERAGE_SONG_DURATION = 210;
const AVERAGE_ALBUM_DURATION = AVERAGE_SONG_DURATION * AVERAGE_NUMBER_OF_TRACKS;
const LIST_LENGTH = 10;

export default async function generateList(): Promise<void> {
  const mongodb = new MongoDatabase();
  await mongodb.connect();
  try {
    const tagRecord = await pickTag(mongodb);
    const albums = (await mongodb.albums
      .find({
        tags: {
          [tagRecord.name]: {
            $gt: 0,
          },
        },
      })
      .project({
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
                '$playcount',
                { $ifNull: ['$numberOfTracks', AVERAGE_NUMBER_OF_TRACKS] },
              ],
            },
            '$listeners',
            {
              $divide: [
                { $ifNull: ['$duration', AVERAGE_ALBUM_DURATION] },
                { $ifNull: ['$numberOfTracks', AVERAGE_NUMBER_OF_TRACKS] },
              ],
            },
            `$tags.${tagRecord.name}`,
          ],
        },
      })
      .sort({ weight: -1 })
      .limit(LIST_LENGTH)
      .sort({ date: 1 })
      .toArray()) as AlbumRecord[];
    await saveList(
      mongodb,
      tagRecord,
      size(albums) >= LIST_LENGTH ? albums : null,
    );
    await updateTimestamp(mongodb, tagRecord);
  } finally {
    await mongodb.close();
  }
}
