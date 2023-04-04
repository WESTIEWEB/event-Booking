import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletDto } from '../dtos';
import { WalletPersistedEntity } from '../entities';
import { IWalletReadRepository } from '../interfaces';
import { WalletMapper } from '../mappers';

@Injectable()
export class WalletReadRepository implements IWalletReadRepository {
  constructor(
    @InjectRepository(WalletPersistedEntity)
    private readonly repository: Repository<WalletPersistedEntity>,
    private mapper: WalletMapper,
  ) {}

  async findByUserId(id: string): Promise<WalletDto | null> {
    const entity = await this.repository.findOne({
      where: {
        userId: id,
      },
    });

    if (!entity) {
      return null;
    }

    return this.mapper.toDtoFromPersistence(entity);
  }

  async findById(id: string): Promise<WalletDto | null> {
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
}
