import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedDto } from 'src/common/dtos';
import { Repository } from 'typeorm';
import { EventTypeDto, GetAllEventTypesQueryDto } from '../dtos';
import { EventTypePersistedEntity } from '../entities';
import { IEventTypeReadRepository } from '../interfaces';
import { EventTypeMapper } from '../mappers';

@Injectable()
export class EventTypeReadRepository implements IEventTypeReadRepository {
  constructor(
    @InjectRepository(EventTypePersistedEntity)
    private readonly repository: Repository<EventTypePersistedEntity>,
    private readonly mapper: EventTypeMapper,
  ) {}

  async getAll(options: GetAllEventTypesQueryDto): Promise<PaginatedDto<EventTypeDto>> {
    let items: EventTypeDto[] = [];
    const {
      limit = 20, offset = 0, active = true, orderBy = 'createdAt', order = 'DESC',
    } = options;
    const [entities, totalCount] = await this.repository.findAndCount({
      where: {
        active,
      },
      take: limit,
      skip: offset,
      order: {
        [orderBy]: order,
      },
    });

    if (totalCount > 0) {
      items = entities.map((entity) => this.mapper.toDtoFromPersistence(entity));
    }

    return {
      items,
      totalCount,
    };
  }
}
