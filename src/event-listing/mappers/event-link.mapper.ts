import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/common/interfaces';
import { EventLink } from '../domains';
import { EventLinkDto } from '../dtos';
import { EventLinkPersistedEntity } from '../entities';

@Injectable()
export class EventLinkMapper implements IMapper<EventLink, EventLinkPersistedEntity, EventLinkDto> {
  toDto(domain: EventLink): EventLinkDto {
    return {
      id: domain.id,
      eventListingId: domain.eventListingId,
      label: domain.label,
      url: domain.url,
      description: domain.description,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  toDtoFromPersistence(entity: EventLinkPersistedEntity): EventLinkDto {
    return {
      id: entity.id,
      eventListingId: entity.eventListingId,
      label: entity.label,
      url: entity.url,
      description: entity.description,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  toDomain(entity: EventLinkPersistedEntity): EventLink {
    return EventLink.create({
      eventListingId: entity.eventListingId,
      label: entity.label,
      url: entity.url,
      description: entity.description,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }, entity.id);
  }

  toDomainFromDto(dto: EventLinkDto): EventLink {
    return EventLink.create({
      eventListingId: dto.eventListingId,
      label: dto.label,
      url: dto.url,
      description: dto.description,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    }, dto.id);
  }

  toEntity(domain: EventLink): EventLinkPersistedEntity {
    return {
      id: domain.id,
      eventListingId: domain.eventListingId,
      label: domain.label,
      url: domain.url,
      description: domain.description,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
