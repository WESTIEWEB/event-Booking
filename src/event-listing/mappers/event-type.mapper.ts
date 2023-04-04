import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/common/interfaces';
import { EventType } from '../domains';
import { EventTypeDto } from '../dtos';
import { EventTypePersistedEntity } from '../entities';

@Injectable()
export class EventTypeMapper implements IMapper<EventType, EventTypePersistedEntity, EventTypeDto> {
  toDto(domain: EventType): EventTypeDto {
    return {
      id: domain.id,
      name: domain.name,
      slug: domain.slug,
      active: domain.active,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  toDtoFromPersistence(entity: EventTypePersistedEntity): EventTypeDto {
    return {
      id: entity.id,
      name: entity.name,
      slug: entity.slug,
      active: entity.active,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  toDomain(entity: EventTypePersistedEntity): EventType {
    return EventType.create({
      name: entity.name,
      slug: entity.slug,
      active: entity.active,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }, entity.id);
  }

  toEntity(domain: EventType): EventTypePersistedEntity {
    return {
      id: domain.id,
      name: domain.name,
      slug: domain.slug,
      active: domain.active,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
