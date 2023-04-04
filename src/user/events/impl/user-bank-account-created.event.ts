import { UserBankAccountDto } from 'src/user/dtos';

export class UserBankAccountCreatedEvent {
  constructor(public readonly userBankAccount: UserBankAccountDto) {}
}
