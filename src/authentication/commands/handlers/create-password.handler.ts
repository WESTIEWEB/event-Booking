import {
  BadRequestException,
  CACHE_MANAGER, Inject, Injectable, NotFoundException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Cache } from 'cache-manager';
import { generateUserPasswordResetKey } from 'src/authentication/utils/password-reset';
import { IUserService } from 'src/user/interfaces';
import { UserProviders } from 'src/user/user.providers';
import { CreatePasswordCommand } from '../impl';

@Injectable()
@CommandHandler(CreatePasswordCommand)
export class CreatePasswordHandler implements ICommandHandler<CreatePasswordCommand, void> {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    @Inject(UserProviders.UserService)
    private readonly userService: IUserService,
  ) {}

  async execute(command: CreatePasswordCommand): Promise<void> {
    const { email, password, resetToken } = command.input;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const key = generateUserPasswordResetKey(user.id);
    const token = await this.cacheManager.get<string>(key);

    if (!token) {
      throw new BadRequestException('Your password reset token has expired');
    }

    if (token !== resetToken) {
      throw new BadRequestException('Your password reset token is invalid');
    }

    await this.userService.updatePassword(user.id, password);

    await this.cacheManager.del(key);
  }
}
