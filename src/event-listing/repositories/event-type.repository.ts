import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventType } from '../domains';
import { EventTypeDto } from '../dtos';
import { EventTypePersistedEntity } from '../entities';
import { IEventTypeRepository } from '../interfaces';
import { EventTypeMapper } from '../mappers';

@Injectable()
export class EventTypeRepository implements IEventTypeRepository {
  constructor(
    @InjectRepository(EventTypePersistedEntity)
    private readonly repository: Repository<EventTypePersistedEntity>,
    private readonly mapper: EventTypeMapper,
  ) {}

  async create(input: EventType): Promise<EventTypeDto> {
    const entity = this.mapper.toEntity(input);
    await this.repository.save(entity);
    return this.mapper.toDtoFromPersistence(entity);
  }
}
