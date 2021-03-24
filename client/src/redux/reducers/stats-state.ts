import { Stats } from '../../https-callables/get-stats';

export default interface StatsState {
  error: Error | null;
  isLoading: boolean;
  stats: Stats | null;
}
