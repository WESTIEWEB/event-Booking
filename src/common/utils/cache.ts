export function generateUserCacheKey(prefix: string, userId: string): string {
  return `${prefix}${userId}`;
}
