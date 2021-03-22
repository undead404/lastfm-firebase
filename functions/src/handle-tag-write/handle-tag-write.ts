import firebase from 'firebase-admin';
import { Change } from 'firebase-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

export default function handleTagWrite(change: Change<DocumentSnapshot>): void {
  if (!change.before.exists) {
    // New document Created : add one to count

    firebase
      .firestore()
      .collection('properties')
      .doc('properties')
      .update({ numberOfTags: firebase.firestore.FieldValue.increment(1) });
  } else if (change.before.exists && change.after.exists) {
    // Updating existing document : Do nothing
  } else if (!change.after.exists) {
    // Deleting document : subtract one from count

    firebase
      .firestore()
      .collection('properties')
      .doc('properties')
      .update({ numberOfTags: firebase.firestore.FieldValue.increment(-1) });
  }
}
