import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateWalletCommand } from '../commands/impl';
import { CreateWalletDto, WalletDto } from '../dtos';
import { IWalletService } from '../interfaces/wallet.service.interface';

@Injectable()
export class WalletService implements IWalletService {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  create(input: CreateWalletDto): Promise<WalletDto> {
    return this.commandBus.execute(new CreateWalletCommand(input));
  }
}
