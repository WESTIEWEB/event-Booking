import { UserBankAccount } from '../domain';

export interface IUserBankAccountRepository {
  findById(id: string): Promise<UserBankAccount | null>;
  save(userBankAccount: UserBankAccount): Promise<void>;
}
