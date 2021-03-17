import { Collection, Db, MongoClient } from 'mongodb';

import {
  MONGODB_CLUSTER,
  MONGODB_DATABASE,
  MONGODB_PASSWORD,
  MONGODB_USERNAME,
} from './environment';
import { AlbumRecord, AlbumsList, TagRecord } from './types';

const uri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}/${MONGODB_DATABASE}?retryWrites=true&writeConcern=majority`;

export default class MongoDatabase {
  private client: MongoClient;

  constructor() {
    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  get albums(): Collection<AlbumRecord> {
    return this.database.collection<AlbumRecord>('albums');
  }

  get albumsLists(): Collection<AlbumsList> {
    return this.database.collection<AlbumsList>('albumsLists');
  }

  // eslint-disable-next-line class-methods-use-this
  async close(): Promise<void> {
    // return this.client.close();
  }

  connect(): Promise<MongoClient> {
    return this.client.connect();
  }

  private get database(): Db {
    return this.client.db(MONGODB_DATABASE);
  }

  get tags(): Collection<TagRecord> {
    return this.database.collection<TagRecord>('tags');
  }
}
