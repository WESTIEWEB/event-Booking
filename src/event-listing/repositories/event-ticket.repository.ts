import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventTicket } from '../domains';
import { EventTicketDto } from '../dtos';
import { EventTicketPersistedEntity } from '../entities';
import { IEventTicketRepository } from '../interfaces';
import { EventTicketMapper } from '../mappers';

@Injectable()
export class EventTicketRepository implements IEventTicketRepository {
  constructor(
    @InjectRepository(EventTicketPersistedEntity)
    private readonly repository: Repository<EventTicketPersistedEntity>,
    private readonly mapper: EventTicketMapper,
  ) {}

  async save(eventTicket: EventTicket): Promise<EventTicketDto> {
    const entity = this.mapper.toEntity(eventTicket);
    await this.repository.save(entity);
    return this.mapper.toDtoFromPersistence(entity);
  }
}
