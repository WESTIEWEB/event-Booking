import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserBankAccount } from 'src/user/domain';
import { UserBankAccountDto } from 'src/user/dtos';
import { IUserBankAccountRepository } from 'src/user/interfaces';
import { UserProviders } from 'src/user/user.providers';
import { CreateUserBankAccountCommand } from '../impl';

@Injectable()
@CommandHandler(CreateUserBankAccountCommand)
export class CreateUserBankAccountHandler implements ICommandHandler<CreateUserBankAccountCommand, UserBankAccountDto> {
  constructor(
    @Inject(UserProviders.UserBankAccountRepository)
    private readonly repository: IUserBankAccountRepository,
    @Inject(UserProviders.UserBankAccountReadRepository)
    private readonly readRepository: IUserBankAccountRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateUserBankAccountCommand) {
    const { input } = command;

    const domain = UserBankAccount.create(input);
    const userBankAccount = this.publisher.mergeObjectContext(domain);

    await this.repository.save(userBankAccount);

    userBankAccount.commit();

    return this.readRepository.findById(userBankAccount.id);
  }
}
