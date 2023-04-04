import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventLink } from '../domains';
import { EventLinkPersistedEntity } from '../entities';
import { IEventLinkRepository } from '../interfaces';
import { EventLinkMapper } from '../mappers';

@Injectable()
export class EventLinkRepository implements IEventLinkRepository {
  constructor(
    @InjectRepository(EventLinkPersistedEntity)
    private readonly repository: Repository<EventLinkPersistedEntity>,
    private readonly mapper: EventLinkMapper,
  ) {}

  async save(eventLink: EventLink): Promise<void> {
    const entity = this.mapper.toEntity(eventLink);
    await this.repository.save(entity);
  }

  async saveMany(eventLinks: EventLink[]): Promise<void> {
    const entities = eventLinks.map((eventLink) => this.mapper.toEntity(eventLink));
    await this.repository.save(entities);
  }
}
