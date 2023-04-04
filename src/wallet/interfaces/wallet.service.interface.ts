import { CreateWalletDto, WalletDto } from '../dtos';

export interface IWalletService {
  create(input: CreateWalletDto): Promise<WalletDto>;
}
