import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/common/interfaces';
import { EventTicket } from '../domains';
import { EventTicketDto } from '../dtos';
import { EventTicketPersistedEntity } from '../entities';

@Injectable()
export class EventTicketMapper implements IMapper<EventTicket, EventTicketPersistedEntity, EventTicketDto> {
  toDto(domain: EventTicket): EventTicketDto {
    return {
      id: domain.id,
      type: domain.type,
      eventListingId: domain.eventListingId,
      name: domain.name,
      description: domain.description,
      displayName: domain.displayName,
      price: domain.price,
      availableQuantity: domain.availableQuantity,
      saleStartDate: domain.saleStartDate,
      saleEndDate: domain.saleEndDate,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  toDtoFromPersistence(entity: EventTicketPersistedEntity): EventTicketDto {
    return {
      id: entity.id,
      type: entity.type,
      eventListingId: entity.eventListingId,
      name: entity.name,
      description: entity.description,
      displayName: entity.displayName,
      price: entity.price,
      availableQuantity: entity.availableQuantity,
      saleStartDate: entity.saleStartDate,
      saleEndDate: entity.saleEndDate,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  toDomain(entity: EventTicketPersistedEntity): EventTicket {
    return EventTicket.create({
      eventListingId: entity.eventListingId,
      type: entity.type,
      name: entity.name,
      displayName: entity.displayName,
      description: entity.description,
      price: entity.price,
      availableQuantity: entity.availableQuantity,
      saleStartDate: entity.saleStartDate,
      saleEndDate: entity.saleEndDate,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }, entity.id);
  }

  toEntity(domain: EventTicket): EventTicketPersistedEntity {
    return {
      id: domain.id,
      type: domain.type,
      eventListingId: domain.eventListingId,
      name: domain.name,
      displayName: domain.displayName,
      description: domain.description,
      price: domain.price,
      availableQuantity: domain.availableQuantity,
      saleStartDate: domain.saleStartDate,
      saleEndDate: domain.saleEndDate,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
