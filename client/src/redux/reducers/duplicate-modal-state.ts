import { Album } from '../../misc/types';

export default interface DuplicateModalState {
  albums: Album[];
  error: Error | null;
  isLoading: boolean;
}
