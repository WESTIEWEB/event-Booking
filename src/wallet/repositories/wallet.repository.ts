import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from '../domains';
import { WalletPersistedEntity } from '../entities';
import { IWalletRepository } from '../interfaces';
import { WalletMapper } from '../mappers';

@Injectable()
export class WalletRepository implements IWalletRepository {
  constructor(
    @InjectRepository(WalletPersistedEntity)
    private readonly repository: Repository<WalletPersistedEntity>,
    private mapper: WalletMapper,
  ) {}

  async save(wallet: Wallet): Promise<void> {
    const entity = this.mapper.toEntity(wallet);
    await this.repository.save(entity);
  }
}
