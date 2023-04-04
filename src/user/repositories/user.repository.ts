import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../domain';
import { UserPersistedEntity } from '../entities';
import { IUserRepository } from '../interfaces';
import { UserMapper } from '../mappers';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserPersistedEntity)
    private readonly repository: Repository<UserPersistedEntity>,
    private readonly mapper: UserMapper,
  ) {}

  async findById(id: string): Promise<User | null> {
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

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repository.findOne({
      where: {
        email,
      },
    });

    if (!entity) {
      return null;
    }

    return this.mapper.toDomain(entity);
  }

  async save(user: User): Promise<void> {
    const entity = this.mapper.toEntity(user);
    await this.repository.save(entity);
  }
}
