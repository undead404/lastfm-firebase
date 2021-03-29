import { ObjectId } from 'mongodb';

import mongoDatabase from '../common/mongo-database';
import { AlbumRecord } from '../common/types';

export default async function setAlbumDuplicate({
  originalId,
  targetId,
}: {
  originalId: string;
  targetId: string;
}): Promise<void> {
  if (!mongoDatabase.isConnected) {
    await mongoDatabase.connect();
  }
  const originalAlbum = await mongoDatabase.albums.findOne({
    _id: new ObjectId(originalId),
  });
  if (!originalAlbum) {
    throw new Error('Original album not found');
  }
  const targetAlbum = await mongoDatabase.albums.findOne({
    _id: new ObjectId(targetId),
  });
  if (!targetAlbum) {
    throw new Error('Target album not found');
  }
  const targetAlbumUpdate: Partial<AlbumRecord> = {
    duplicateOf: originalAlbum._id,
  };
  await mongoDatabase.albums.updateOne(
    {
      _id: targetAlbum._id,
    },
    { $set: targetAlbumUpdate },
  );
}
