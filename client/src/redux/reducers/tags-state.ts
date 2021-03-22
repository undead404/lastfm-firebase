import { Tag } from '../../misc/types';

export default interface TagsState {
  currentTag: null | Tag;
  currentTags: Tag[];
  error: null | Error;
  isLoading: boolean;
  pageNumber: number;
  tags: Tag[];
  total: number;
}
