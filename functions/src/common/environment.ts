import { config } from 'firebase-functions';

export default {
  LASTFM_API_KEY: config().lastfm.apikey,
};
