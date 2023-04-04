import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/common/interfaces';
import { UserBankAccount } from '../domain';
import { UserBankAccountDto } from '../dtos';
import { UserBankAccountPersistedEntity } from '../entities';

@Injectable()
export class UserBankAccountMapper implements IMapper<UserBankAccount, UserBankAccountPersistedEntity, UserBankAccountDto> {
  toDto(domain: UserBankAccount): UserBankAccountDto {
    return {
      id: domain.id,
      userId: domain.userId,
      bankName: domain.bankName,
      accountNumber: domain.accountNumber,
      accountName: domain.accountName,
      bankCode: domain.bankCode,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  toDtoFromPersistence(entity: UserBankAccountPersistedEntity): UserBankAccountDto {
    return {
      id: entity.id,
      userId: entity.userId,
      bankName: entity.bankName,
      accountNumber: entity.accountNumber,
      accountName: entity.accountName,
      bankCode: entity.bankCode,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  toDomain(entity: UserBankAccountPersistedEntity): UserBankAccount {
    return UserBankAccount.create({
      userId: entity.userId,
      bankName: entity.bankName,
      accountNumber: entity.accountNumber,
      accountName: entity.accountName,
      bankCode: entity.bankCode,
      providerTransferReference: entity.providerTransferReference,
    }, entity.id);
  }

  toEntity(domain: UserBankAccount): UserBankAccountPersistedEntity {
    return {
      id: domain.id,
      userId: domain.userId,
      bankName: domain.bankName,
      accountNumber: domain.accountNumber,
      accountName: domain.accountName,
      bankCode: domain.bankCode,
      providerTransferReference: domain.providerTransferReference,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
