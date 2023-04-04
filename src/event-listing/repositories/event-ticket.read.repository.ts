import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventTicketDto } from '../dtos';
import { EventTicketPersistedEntity } from '../entities';
import { IEventTicketReadRepository } from '../interfaces';
import { EventTicketMapper } from '../mappers';

@Injectable()
export class EventTicketReadRepository implements IEventTicketReadRepository {
  constructor(
    @InjectRepository(EventTicketPersistedEntity)
    private readonly repository: Repository<EventTicketPersistedEntity>,
    private readonly mapper: EventTicketMapper,
  ) {}

  async findByEventListingId(eventListingId: string): Promise<EventTicketDto[]> {
    const entities = await this.repository.find({
      where: {
        eventListingId,
      },
      order: {
        name: 'ASC',
      },
    });

    return entities.map((entity) => this.mapper.toDtoFromPersistence(entity));
  }
}
