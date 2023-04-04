import { createHash } from 'crypto';

export function generateUserIdentificationToken(userId: string, identifier: string): string {
  const value = `${userId}.${identifier}.${new Date().getTime()}`;
  return createHash('md5').update(value).digest('hex');
}
