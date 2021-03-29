import { logger } from 'firebase-functions';
import { Collection, Db, MongoClient, WithId } from 'mongodb';

import {
  MONGODB_CLUSTER,
  MONGODB_DATABASE,
  MONGODB_PASSWORD,
  MONGODB_USERNAME,
} from './environment';
import { AlbumRecord, TagRecord } from './types';

const uri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}/${MONGODB_DATABASE}?retryWrites=true&writeConcern=majority`;

class MongoDatabase {
  private client: MongoClient;

  constructor() {
    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  get albums(): Collection<WithId<AlbumRecord>> {
    return this.database.collection<WithId<AlbumRecord>>('albums');
  }

  connect(): Promise<MongoClient> {
    logger.debug('mongodb.connect()');
    return this.client.connect();
  }

  private get database(): Db {
    return this.client.db(MONGODB_DATABASE);
  }

  get isConnected(): boolean {
    return this.client.isConnected();
  }

  get tags(): Collection<WithId<TagRecord>> {
    return this.database.collection<WithId<TagRecord>>('tags');
  }
}

export default new MongoDatabase();
