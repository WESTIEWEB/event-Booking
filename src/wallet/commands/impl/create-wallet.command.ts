import { CreateWalletDto } from 'src/wallet/dtos';

export class CreateWalletCommand {
  constructor(public readonly input: CreateWalletDto) {}
}
