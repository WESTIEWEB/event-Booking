import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/user/interfaces';
import { UserProviders } from 'src/user/user.providers';
import { ValidateUserPasswordCommand } from '../impl';

@Injectable()
@CommandHandler(ValidateUserPasswordCommand)
export class ValidateUserPasswordCommandHandler implements ICommandHandler<ValidateUserPasswordCommand, boolean> {
  constructor(
    @Inject(UserProviders.UserRepository)
    private readonly repository: IUserRepository,
  ) {}

  async execute(command: ValidateUserPasswordCommand): Promise<boolean> {
    const { id, password } = command;
    const user = await this.repository.findById(id);

    if (!user) {
      return false;
    }

    const valid = await user.validatePassword(password);

    return valid;
  }
}
