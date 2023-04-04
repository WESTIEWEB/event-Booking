import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserBankAccount } from '../domain';
import { UserBankAccountPersistedEntity } from '../entities';
import { IUserBankAccountRepository } from '../interfaces';
import { UserBankAccountMapper } from '../mappers';

@Injectable()
export class UserBankAccountRepository implements IUserBankAccountRepository {
  constructor(
    @InjectRepository(UserBankAccountPersistedEntity)
    private readonly repository: Repository<UserBankAccountPersistedEntity>,
    private readonly mapper: UserBankAccountMapper,
  ) {}

  private async exists(bankAccount: UserBankAccount): Promise<UserBankAccountPersistedEntity | boolean> {
    const entity = await this.repository.findOne({
      where: {
        userId: bankAccount.userId,
        bankCode: bankAccount.bankCode,
        accountNumber: bankAccount.accountNumber,
      },
    });

    if (!entity) {
      return false;
    }

    return entity;
  }

  async findById(id: string): Promise<UserBankAccount | null> {
    const entity = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!entity) {
      return null;
    }

    return this.mapper.toDomain(entity);
  }

  async save(bankAccount: UserBankAccount): Promise<void> {
    const entity = this.mapper.toEntity(this.mapper.toDomain(bankAccount));
    await this.repository.save(entity);
  }
}
