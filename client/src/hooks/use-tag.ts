import property from 'lodash/property';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Tag } from '../misc/types';
import { acquireTag } from '../redux/actions/tag';

import { RootState } from '../redux/reducers';

export default function useTag(tagName: string): Tag {
  const dispatch = useDispatch();
  const tag = useSelector<RootState, Tag>(property('tags.currentTag'));
  useEffect(() => {
    dispatch(acquireTag(tagName));
  }, [dispatch, tagName]);
  return tag;
}
