import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { generateUserCacheKey, generateUserIdentificationToken } from 'src/common/utils';
import { SendEmailOptions } from 'src/email';
import { UserEmailVerificationRequested } from '../events/impl';
import { UserCachePrefixes } from '../user.constants';

@Injectable()
export class UserEmailFactory {
  constructor(
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async emailVerificationRequested(event: UserEmailVerificationRequested): Promise<SendEmailOptions> {
    const { user } = event;
    const now = new Date().getTime();
    const verificationTTL = this.configService.getOrThrow<number>('user.verification.ttl') * 1000;
    const verificationFrontendUrl = this.configService.getOrThrow<string>('user.verification.url');

    const key = generateUserCacheKey(UserCachePrefixes.EmailVerification, user.id);
    const token = generateUserIdentificationToken(user.id, user.email);
    const verificationUrl = `${verificationFrontendUrl}?token=${token}&email=${user.email}`;
    const expiresAt = now + verificationTTL;

    await this.cacheManager.set(key, token, verificationTTL);

    return {
      to: user.email,
      subject: 'Verify your email address',
      template: 'email-verification',
      context: {
        verificationUrl,
        expiresAt,
      },
    };
  }
}
