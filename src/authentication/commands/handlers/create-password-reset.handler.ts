import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Cache } from 'cache-manager';
import { AuthCachePrefixes } from 'src/authentication/constants';
import { PasswordResetRequestedEvent } from 'src/authentication/events';
import { generateUserCacheKey, generateUserIdentificationToken } from 'src/common/utils';
import { AppLogger, InjectLogger } from 'src/logging';
import { UserService } from 'src/user/services';
import { UserProviders } from 'src/user/user.providers';
import { CreatePasswordResetCommand } from '../impl';

@Injectable()
@CommandHandler(CreatePasswordResetCommand)
export class CreatePasswordResetCommandHandler implements ICommandHandler<CreatePasswordResetCommand, void> {
  constructor(
    private readonly configService: ConfigService,
    @Inject(UserProviders.UserService)
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly eventBus: EventBus,
    @InjectLogger(CreatePasswordResetCommandHandler.name)
    private readonly logger: AppLogger,
  ) {}

  async execute(command: CreatePasswordResetCommand): Promise<void> {
    const { email } = command;
    let token: string;
    const now = new Date().getTime();
    // Cache manager expects TTL in milliseconds
    const tokenTTL = this.configService.getOrThrow<number>('password.reset.token_ttl') * 1000;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      this.logger.error({}, 'User not found');
    }

    const cacheKey = generateUserCacheKey(AuthCachePrefixes.PasswordReset, user.id);

    if (await this.cacheManager.get(cacheKey)) {
      token = await this.cacheManager.get(cacheKey);
    } else {
      token = generateUserIdentificationToken(user.id, user.email);
    }

    const expiresAt = now + tokenTTL;

    await this.cacheManager.set(cacheKey, token, tokenTTL);

    this.eventBus.publish(new PasswordResetRequestedEvent(email, token, expiresAt));
  }
}
