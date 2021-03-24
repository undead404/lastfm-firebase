import property from 'lodash/property';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DEFAULT_TAGS_LIMIT } from '../misc/constants';
import { Tag } from '../misc/types';
import { acquireTags } from '../redux/actions/tags';
import { RootState } from '../redux/reducers';

export default function useTags(pageNumber: number): Tag[] {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(acquireTags(DEFAULT_TAGS_LIMIT * (pageNumber - 1)));
  }, [dispatch, pageNumber]);
  const tags = useSelector<RootState, Tag[]>(property('tags.currentTags'));
  return tags;
}
