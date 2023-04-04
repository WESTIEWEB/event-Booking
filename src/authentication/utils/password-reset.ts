import { createHash } from 'crypto';
import { AuthCachePrefixes } from '../constants';

export function generateUserPasswordResetKey(userId: string): string {
  return `${AuthCachePrefixes.PasswordReset}${userId}`;
}

export function generateUserPasswordResetToken(userId: string, email: string): string {
  const value = `${userId}.${email}.${new Date().getTime()}`;
  return createHash('md5').update(value).digest('hex');
}
