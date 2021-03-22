import property from 'lodash/property';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import encodeFirebaseKey from '../misc/encode-firebase-key';
import { firestore } from '../misc/firebase-app';

import { FirebaseTag, Tag } from '../misc/types';
import {
  setCurrentTag,
  setTagAcquireFailure,
  setTagAcquireLoading,
} from '../redux/actions/tag';

import { RootState } from '../redux/reducers';

export default function useTag(tagName: string): Tag {
  const dispatch = useDispatch();
  const tag = useSelector<RootState, Tag>(property('tags.currentTag'));
  useEffect(() => {
    dispatch(setTagAcquireLoading());
    const unsubscribe = firestore
      .collection('tags')
      .doc(encodeFirebaseKey(tagName))
      .onSnapshot((snapshot) => {
        try {
          dispatch(setCurrentTag(snapshot.data() as FirebaseTag | undefined));
        } catch (error) {
          dispatch(setTagAcquireFailure(error));
        }
      });
    return () => unsubscribe();
  }, [dispatch, tagName]);
  return tag;
}
