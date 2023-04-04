import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Wallet } from 'src/wallet/domains';
import { IWalletReadRepository, IWalletRepository } from 'src/wallet/interfaces';
import { WalletProviders } from 'src/wallet/wallet.providers';
import { CreateWalletCommand } from '../impl';

@Injectable()
@CommandHandler(CreateWalletCommand)
export class CreateWalletHandler implements ICommandHandler<CreateWalletCommand> {
  constructor(
    @Inject(WalletProviders.WalletRepository)
    private readonly repository: IWalletRepository,
    @Inject(WalletProviders.WalletReadRepository)
    private readonly readRepository: IWalletReadRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateWalletCommand): Promise<any> {
    const { input } = command;
    const domain = Wallet.create({
      userId: input.userId,
      availableBalance: input.availableBalance,
      ledgerBalance: input.ledgerBalance,
      currency: input.currency,
      createdAt: undefined,
      updatedAt: undefined,
    });
    const wallet = this.publisher.mergeObjectContext(domain);

    await this.repository.save(wallet);

    wallet.commit();

    return this.readRepository.findByUserId(input.userId);
  }
}
