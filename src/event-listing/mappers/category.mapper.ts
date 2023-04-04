import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/common/interfaces';
import { Category } from '../domains';
import { CategoryDto } from '../dtos';
import { CategoryPersistedEntity } from '../entities';

@Injectable()
export class CategoryMapper implements IMapper<Category, CategoryPersistedEntity, CategoryDto> {
  toDto(domain: Category): CategoryDto {
    return {
      id: domain.id,
      name: domain.name,
      slug: domain.slug,
      active: domain.active,
      description: domain.description,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  toDtoFromPersistence(entity: CategoryPersistedEntity): CategoryDto {
    return {
      id: entity.id,
      name: entity.name,
      slug: entity.slug,
      active: entity.active,
      description: entity.description,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  toDomain(entity: CategoryPersistedEntity): Category {
    return Category.create({
      name: entity.name,
      slug: entity.slug,
      active: entity.active,
      description: entity.description,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }, entity.id);
  }

  toEntity(domain: Category): CategoryPersistedEntity {
    return {
      id: domain.id,
      parentCategoryId: domain.parentCategoryId,
      name: domain.name,
      slug: domain.slug,
      active: domain.active,
      description: domain.description,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
