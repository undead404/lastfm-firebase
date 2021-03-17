import { config } from 'firebase-functions';

export const LASTFM_API_KEY = config().lastfm.apikey;
export const MONGODB_CLUSTER = config().mongodb.cluster;
export const MONGODB_DATABASE = config().mongodb.database;
export const MONGODB_PASSWORD = config().mongodb.password;
export const MONGODB_USERNAME = config().mongodb.username;
