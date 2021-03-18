import firebase from 'firebase-admin';
import { https, logger, pubsub, runWith } from 'firebase-functions';

import generateListFunction from './generate-list/generate-list';
import getProcessedTagNamesFunction from './get-processed-tag-names/get-processed-tag-names';
import getTagListFunction from './get-tag-list/get-tag-list';
import populateAlbumsCoversFunction from './populate-albums-covers/populate-albums-covers';
import populateAlbumsDatesFunction from './populate-albums-dates/populate-albums-dates';
import populateAlbumsStatsFunction from './populate-albums-stats/populate-albums-stats';
import populateAlbumsTagsFunction from './populate-albums-tags/populate-albums-tags';
import scrapeAlbumsFunction from './scrape-albums/scrape-albums';

firebase.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const generateList = pubsub
  .schedule('every 5 minutes')
  .onRun(async () => {
    try {
      await generateListFunction();
      return null;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  });

export const getTagList = https.onCall(async (data) => ({
  tagList: await getTagListFunction(data.tagName),
}));

export const getProcessedTagNames = https.onCall(async () => ({
  tags: await getProcessedTagNamesFunction(),
}));

export const populateAlbumsCovers = runWith({
  timeoutSeconds: 540,
})
  .pubsub.schedule('every 15 minutes')
  .onRun(async () => {
    try {
      await populateAlbumsCoversFunction();
      return null;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  });
export const populateAlbumsDates = runWith({
  timeoutSeconds: 540,
})
  .pubsub.schedule('every 30 minutes')
  .onRun(async () => {
    try {
      await populateAlbumsDatesFunction();
      return null;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  });

export const populateAlbumsStats = runWith({
  timeoutSeconds: 540,
})
  .pubsub.schedule('every 15 minutes')
  .onRun(async () => {
    try {
      await populateAlbumsStatsFunction();
      return null;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  });

export const populateAlbumsTags = runWith({
  timeoutSeconds: 540,
})
  .pubsub.schedule('every 15 minutes')
  .onRun(async () => {
    try {
      await populateAlbumsTagsFunction();
      return null;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  });

export const scrapeAlbums = runWith({
  memory: '1GB',
  timeoutSeconds: 540,
})
  .pubsub.schedule('0 * * * *')
  .onRun(async () => {
    try {
      await scrapeAlbumsFunction();
      return null;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  });
