import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedDto } from 'src/common/dtos';
import { Repository } from 'typeorm';
import { CategoryDto } from '../dtos';
import { CategoryPersistedEntity } from '../entities';
import { ICategoryReadRepository } from '../interfaces';
import { CategoryMapper } from '../mappers';

@Injectable()
export class CategoryReadRepository implements ICategoryReadRepository {
  constructor(
    @InjectRepository(CategoryPersistedEntity)
    private readonly repository: Repository<CategoryPersistedEntity>,
    private readonly mapper: CategoryMapper,
  ) {}

  async getAll(options: any): Promise<PaginatedDto<CategoryDto>> {
    const {
      limit, offset, orderBy, order,
    } = options;
    const [entities, count] = await this.repository.findAndCount({
      take: limit,
      skip: offset,
      order: {
        [orderBy]: order,
      },
    });

    return {
      items: entities.map((entity) => this.mapper.toDtoFromPersistence(entity)),
      totalCount: count,
    };
  }

  async findOne(id: string): Promise<CategoryDto | null> {
    const entity = await this.repository.findOne({
      where: { id },
    });

    if (!entity) {
      return null;
    }

    return this.mapper.toDtoFromPersistence(entity);
  }
}
