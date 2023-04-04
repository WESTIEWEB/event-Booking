import { Wallet } from '../domains';

export interface IWalletRepository {
  save(wallet: Wallet): Promise<void>;
}
