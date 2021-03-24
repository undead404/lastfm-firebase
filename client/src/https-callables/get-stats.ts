import { functions, performance } from '../misc/firebase-app';

export interface TagsStats {
  byProcessing: Record<string, number>;
  byListGeneration: Record<string, number>;
}
export interface Stats {
  tags: TagsStats;
}

const callable = functions.httpsCallable('getStats');

export default async function getStats(): Promise<Stats> {
  const trace = performance.trace('GET_STATS_REQUEST');
  trace.start();
  const stats: Stats = (await callable()).data;
  trace.stop();
  return stats;
}
