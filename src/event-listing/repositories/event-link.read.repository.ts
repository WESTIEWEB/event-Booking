import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventLinkDto } from '../dtos';
import { EventLinkPersistedEntity } from '../entities';
import { IEventLinkReadRepository } from '../interfaces';
import { EventLinkMapper } from '../mappers';

@Injectable()
export class EventLinkReadRepository implements IEventLinkReadRepository {
  constructor(
    @InjectRepository(EventLinkPersistedEntity)
    private readonly repository: Repository<EventLinkPersistedEntity>,
    private readonly mapper: EventLinkMapper,
  ) {}

  async findByEventListingId(eventListingId: string): Promise<EventLinkDto[]> {
    const entities = await this.repository.find({
      where: {
        eventListingId,
      },
      order: {
        createdAt: 'ASC',
      },
    });

    return entities.map((entity) => this.mapper.toDtoFromPersistence(entity));
  }

  async findById(id: string): Promise<EventLinkDto> {
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
}
