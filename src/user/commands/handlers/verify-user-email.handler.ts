import {
  BadRequestException, CACHE_MANAGER, Inject, Injectable, NotFoundException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { generateUserCacheKey } from 'src/common/utils';
import { IUserRepository } from 'src/user/interfaces';
import { UserCachePrefixes } from 'src/user/user.constants';
import { UserProviders } from 'src/user/user.providers';
import { AuthenticationProviders } from 'src/authentication';
import { ITokenService } from 'src/authentication/interfaces';
import { VerifyUserEmailCommand } from '../impl';

@Injectable()
@CommandHandler(VerifyUserEmailCommand)
export class VerifyUserEmailHandler implements ICommandHandler<VerifyUserEmailCommand, string> {
  constructor(
    @Inject(UserProviders.UserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    @Inject(AuthenticationProviders.TokenService)
    private readonly tokenService: ITokenService,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: VerifyUserEmailCommand): Promise<string> {
    const { email, token } = command;
    const target = await this.userRepository.findByEmail(email);

    if (!target) {
      throw new NotFoundException('User not found');
    }

    const user = this.publisher.mergeObjectContext(target);

    if (user.emailVerified) {
      throw new BadRequestException('Your email has already been verified');
    }

    const key = generateUserCacheKey(UserCachePrefixes.EmailVerification, user.id);
    const verificationToken = await this.cacheManager.get<string>(key);

    if (!verificationToken) {
      throw new BadRequestException('Your email verification token has expired');
    }

    if (verificationToken !== token) {
      throw new BadRequestException('Your email verification token is invalid');
    }

    user.verifyEmail();

    await this.userRepository.save(user);

    user.commit();

    await this.cacheManager.del(key);

    return this.tokenService.issueToken({
      subject: user.id,
    });
  }
}
