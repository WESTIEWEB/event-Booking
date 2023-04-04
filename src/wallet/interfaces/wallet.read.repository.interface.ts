import { WalletDto } from '../dtos';

export interface IWalletReadRepository {
  findById(id: string): Promise<WalletDto>;
  findByUserId(userId: string): Promise<WalletDto>;
}
