import firebase from 'firebase/app';
// eslint-disable-next-line import/no-duplicates
import 'firebase/functions';
// eslint-disable-next-line import/no-duplicates
import 'firebase/performance';

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com/`,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.appspot.com`,
});

export default firebaseApp;

export const functions = firebaseApp.functions();
export const performance = firebaseApp.performance();
