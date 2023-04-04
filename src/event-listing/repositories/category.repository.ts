import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../domains';
import { CategoryDto } from '../dtos';
import { CategoryPersistedEntity } from '../entities';
import { ICategoryRepository } from '../interfaces';
import { CategoryMapper } from '../mappers';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(CategoryPersistedEntity)
    private readonly repository: Repository<CategoryPersistedEntity>,
    private readonly mapper: CategoryMapper,
  ) {}

  async findOne(id: string): Promise<Category | null> {
    const entity = await this.repository.findOne({
      where: { id },
    });

    if (!entity) {
      return null;
    }

    return this.mapper.toDomain(entity);
  }

  async save(category: Category): Promise<CategoryDto> {
    const entity = this.mapper.toEntity(category);
    await this.repository.save(entity);
    return this.mapper.toDtoFromPersistence(entity);
  }
}
