import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedDto } from 'src/common/dtos';
import { Repository } from 'typeorm';
import {
  EventListingDto,
  GetAllEventListingsDto,
  GetEventListingsByUserIdDto,
} from '../dtos';
import { EventListingPersistedEntity } from '../entities';
import { IEventListingReadRepository } from '../interfaces';
import { EventListingMapper } from '../mappers';

@Injectable()
export class EventListingReadRepository implements IEventListingReadRepository {
  constructor(
    @InjectRepository(EventListingPersistedEntity)
    private readonly repository: Repository<EventListingPersistedEntity>,
    private readonly mapper: EventListingMapper,
  ) {}

  async findByUserId(
    options: GetEventListingsByUserIdDto,
  ): Promise<PaginatedDto<EventListingDto>> {
    let items: EventListingDto[] = [];

    const {
      limit, offset, userId, order, orderBy,
    } = options;

    const [entities, totalCount] = await this.repository.findAndCount({
      where: {
        ...(userId && { userId }),
      },
      [orderBy]: order,
      take: limit,
      skip: offset,
    });

    if (entities.length) {
      items = entities.map((entity) => this.mapper.toDtoFromPersistence(entity));
    }

    return {
      items,
      totalCount,
    };
  }

  async getAll(
    options: GetAllEventListingsDto,
  ): Promise<PaginatedDto<EventListingDto>> {
    let items: EventListingDto[] = [];
    const {
      limit = 10, offset = 0, userId, status, eventTypeId,
    } = options;
    const [entities, totalCount] = await this.repository.findAndCount({
      where: {
        ...(userId && { userId }),
        ...(status && { status }),
        ...(eventTypeId && { eventTypeId }),
      },
      take: limit,
      skip: offset,
    });

    if (entities.length) {
      items = entities.map((entity) => this.mapper.toDtoFromPersistence(entity));
    }

    return {
      items,
      totalCount,
    };
  }

  async findById(id: string): Promise<EventListingDto | null> {
    const entity = await this.repository.findOne({
      where: { id },
    });

    if (!entity) {
      return null;
    }

    return this.mapper.toDtoFromPersistence(entity);
  }

  async findBySlug(slug: string): Promise<EventListingDto | null> {
    const entity = await this.repository.findOne({
      where: { slug },
    });

    if (!entity) {
      return null;
    }

    return this.mapper.toDtoFromPersistence(entity);
  }

  async findOne(id: string, userId: string): Promise<EventListingDto | null> {
    const entity = await this.repository.findOne({
      where: {
        id,
        userId,
      },
    });
    if (!entity) {
      return null;
    }
    return this.mapper.toDtoFromPersistence(entity);
  }
}
