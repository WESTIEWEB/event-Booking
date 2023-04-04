import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/common/interfaces';
import { Wallet } from '../domains';
import { WalletDto } from '../dtos';
import { WalletPersistedEntity } from '../entities';

@Injectable()
export class WalletMapper implements IMapper<Wallet, WalletPersistedEntity, WalletDto> {
  toDto(domain: Wallet): WalletDto {
    return {
      id: domain.id,
      userId: domain.userId,
      availableBalance: domain.availableBalance,
      ledgerBalance: domain.ledgerBalance,
      currency: domain.currency,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  toDtoFromPersistence(entity: WalletPersistedEntity): WalletDto {
    return {
      id: entity.id,
      userId: entity.userId,
      availableBalance: entity.availableBalance,
      ledgerBalance: entity.ledgerBalance,
      currency: entity.currency,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  toDomain(entity: WalletPersistedEntity) {
    return new Wallet({
      userId: entity.userId,
      availableBalance: entity.availableBalance,
      ledgerBalance: entity.ledgerBalance,
      currency: entity.currency,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }, entity.id);
  }

  toEntity(domain: Wallet): WalletPersistedEntity {
    return {
      id: domain.id,
      userId: domain.userId,
      availableBalance: domain.availableBalance,
      ledgerBalance: domain.ledgerBalance,
      currency: domain.currency,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
