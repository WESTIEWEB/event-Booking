import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthenticationProviders } from 'src/authentication/authentication.providers';
import { ITokenService } from 'src/authentication/interfaces';
import { IUserService } from 'src/user/interfaces';
import { UserProviders } from 'src/user/user.providers';
import { ValidateEmailCredentialCommand } from '../impl/validate-email-credential.command';

@Injectable()
@CommandHandler(ValidateEmailCredentialCommand)
export class ValidateEmailCredentialCommandHandler implements ICommandHandler<ValidateEmailCredentialCommand, string> {
  constructor(
    @Inject(UserProviders.UserService)
    private readonly userService: IUserService,
    @Inject(AuthenticationProviders.TokenService)
    private readonly tokenService: ITokenService,
  ) {}

  async execute(command: ValidateEmailCredentialCommand): Promise<string> {
    const { email, password } = command;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const hasValidPassword = await this.userService.validatePassword(user.id, password);

    if (!hasValidPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.tokenService.issueToken({
      subject: user.id,
    });
  }
}
