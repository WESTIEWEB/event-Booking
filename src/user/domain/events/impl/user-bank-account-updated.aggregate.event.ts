import { UserBankAccount } from 'src/user/domain';

export class UserBankAccountUpdatedAggregateEvent {
  constructor(public readonly userBankAccount: UserBankAccount) {}
}
