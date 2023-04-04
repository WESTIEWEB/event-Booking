import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../dtos';
import { UserPersistedEntity } from '../entities';
import { IUserReadRepository } from '../interfaces';
import { UserMapper } from '../mappers';

@Injectable()
export class UserReadRepository implements IUserReadRepository {
  constructor(
    @InjectRepository(UserPersistedEntity)
    private readonly repository: Repository<UserPersistedEntity>,
    private readonly mapper: UserMapper,
  ) {}

  async findById(id: string): Promise<UserDto | null> {
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

  async findByEmail(email: string): Promise<UserDto | null> {
    const entity = await this.repository.findOne({
      where: {
        email,
      },
    });

    if (!entity) {
      return null;
    }

    return this.mapper.toDtoFromPersistence(entity);
  }
}
