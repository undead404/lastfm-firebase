export function getCacheValue<T>(cacheKey: string): T | null {
  //   const json = sessionStorage.getItem(cacheKey);
  //   if (!json) {
  return null;
  //   }
  //   return JSON.parse(json) as T;
}

export function setCacheValue<T>(cacheKey: string, value: T): void {
  //   sessionStorage.setItem(cacheKey, JSON.stringify(value));
}
