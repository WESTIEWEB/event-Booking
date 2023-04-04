import { UserBankAccount } from 'src/user/domain';

export class UserBankAccountCreatedAggregateEvent {
  constructor(public readonly userBankAccount: UserBankAccount) {}
}
