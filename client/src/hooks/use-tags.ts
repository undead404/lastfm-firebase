import invokeMap from 'lodash/invokeMap';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { firestore } from '../misc/firebase-app';
import {
  setTagsAcquireFailure,
  setTagsAcquireSuccess,
} from '../redux/actions/tags';

export default function useTags(): void {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = firestore
      .collection('tags')
      .orderBy('power', 'desc')
      .onSnapshot((snapshot) => {
        try {
          dispatch(setTagsAcquireSuccess(invokeMap(snapshot.docs, 'data')));
        } catch (error) {
          dispatch(setTagsAcquireFailure(error));
        }
      });
    return () => unsubscribe();
  }, []);
}
