import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedDto } from 'src/common/dtos';
import { FindOptionsWhere, Repository } from 'typeorm';
import { FindUserBankAccountsDto, UserBankAccountDto } from '../dtos';
import { UserBankAccountPersistedEntity } from '../entities';
import { IUserBankAccountReadRepository } from '../interfaces';
import { UserBankAccountMapper } from '../mappers';

@Injectable()
export class UserBankAccountReadRepository implements IUserBankAccountReadRepository {
  constructor(
    @InjectRepository(UserBankAccountPersistedEntity)
    private readonly repository: Repository<UserBankAccountPersistedEntity>,
    private readonly mapper: UserBankAccountMapper,
  ) {}

  async findById(id: string): Promise<UserBankAccountDto | null> {
    const entity = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!entity) {
      return null;
    }

    return this.mapper.toDtoFromPersistence(entity);
  }

  async find(options: FindUserBankAccountsDto): Promise<PaginatedDto<UserBankAccountDto>> {
    const {
      userId,
      bankCode,
      bankName,
      limit = 10,
      offset = 0,
      orderBy = 'createdAt',
      order = 'DESC',
    } = options;

    const where: FindOptionsWhere<UserBankAccountPersistedEntity>[] | FindOptionsWhere<UserBankAccountPersistedEntity> = {};

    if (userId) {
      where.userId = userId;
    }

    if (bankCode) {
      where.bankCode = bankCode;
    }

    if (bankName) {
      where.bankName = bankName;
    }

    const [entities, totalCount] = await this.repository.findAndCount({
      where,
      order: {
        [orderBy]: order,
      },
      take: limit,
      skip: offset,
    });

    return {
      items: entities.map(this.mapper.toDtoFromPersistence),
      totalCount,
    };
  }
}
