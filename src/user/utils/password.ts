import { scrypt, randomBytes, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scryptPromise = promisify(scrypt);

export async function hashPassword(password: string) {
  const salt = randomBytes(8).toString('hex');
  const derivedKey = await scryptPromise(password, salt, 64);
  const hashed = (derivedKey as Buffer).toString('hex');
  return {
    salt,
    hashed,
  };
}

export async function verifyPassword(password: string, compare: string) {
  const [salt, key] = compare.split(':');
  const keyBuffer = Buffer.from(key, 'hex');
  const derivedKey = await scryptPromise(password, salt, 64);
  return timingSafeEqual(keyBuffer, derivedKey as Buffer);
}
