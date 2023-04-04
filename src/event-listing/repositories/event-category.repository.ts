import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventCategory } from '../domains';
import { EventCategoryPersistedEntity } from '../entities';
import { IEventCategoryRepository } from '../interfaces';
import { EventCategoryMapper } from '../mappers';

@Injectable()
export class EventCategoryRepository implements IEventCategoryRepository {
  constructor(
    @InjectRepository(EventCategoryPersistedEntity)
    private readonly repository: Repository<EventCategoryPersistedEntity>,
    private readonly mapper: EventCategoryMapper,
  ) {}

  async save(domain: EventCategory) {
    const entity = this.mapper.toEntity(domain);
    await this.repository.save(entity);
    return this.mapper.toDtoFromPersistence(entity);
  }

  async saveMany(domains: EventCategory[]): Promise<void> {
    const entities = domains.map((domain) => this.mapper.toEntity(domain));
    await this.repository.save(entities);
  }
}
