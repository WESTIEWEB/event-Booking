import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletPersistedEntity, WalletTransactionPersistedEntity } from './entities';
import { WalletRepository, WalletReadRepository } from './repositories';
import * as Mappers from './mappers';
import * as Sagas from './sagas';
import * as CommandHandlers from './commands/handlers';
import { WalletService } from './services';
import { WalletProviders } from './wallet.providers';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      WalletPersistedEntity,
      WalletTransactionPersistedEntity,
    ]),
  ],
  controllers: [],
  providers: [
    { provide: WalletProviders.WalletRepository, useClass: WalletRepository },
    { provide: WalletProviders.WalletReadRepository, useClass: WalletReadRepository },
    { provide: WalletProviders.WalletService, useClass: WalletService },
    ...Object.values(Mappers),
    ...Object.values(CommandHandlers),
    ...Object.values(Sagas),
  ],
  exports: [
    { provide: WalletProviders.WalletService, useClass: WalletService },
  ],
})
export class WalletModule {}
