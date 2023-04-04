import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/common/interfaces';
import { EventCategory } from '../domains';
import { EventCategoryDto } from '../dtos';
import { EventCategoryPersistedEntity } from '../entities';

@Injectable()
export class EventCategoryMapper implements IMapper<EventCategory, EventCategoryPersistedEntity, EventCategoryDto> {
  toDto(domain: EventCategory): EventCategoryDto {
    return {
      id: domain.id,
      eventListingId: domain.eventListingId,
      categoryId: domain.categoryId,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  toDtoFromPersistence(entity: EventCategoryPersistedEntity) {
    return {
      id: entity.id,
      eventListingId: entity.eventListingId,
      categoryId: entity.categoryId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  toDomain(entity: EventCategoryPersistedEntity): EventCategory {
    return EventCategory.create({
      eventListingId: entity.eventListingId,
      categoryId: entity.categoryId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }, entity.id);
  }

  toEntity(domain: EventCategory): EventCategoryPersistedEntity {
    return {
      id: domain.id,
      eventListingId: domain.eventListingId,
      categoryId: domain.categoryId,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
