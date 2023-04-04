import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventListing } from '../domains';
import { EventListingPersistedEntity } from '../entities';
import { EventListingProviders } from '../event-listing.providers';
import { IEventCategoryRepository, IEventLinkRepository, IEventListingRepository } from '../interfaces';
import { EventListingMapper } from '../mappers';

@Injectable()
export class EventListingRepository implements IEventListingRepository {
  constructor(
    @InjectRepository(EventListingPersistedEntity)
    private readonly repository: Repository<EventListingPersistedEntity>,
    @Inject(EventListingProviders.EventCategoryRepository)
    private readonly eventCategoryRepository: IEventCategoryRepository,
    @Inject(EventListingProviders.EventLinkRepository)
    private readonly eventLinkRepository: IEventLinkRepository,
    private readonly mapper: EventListingMapper,
  ) {}

  async findById(id: string): Promise<EventListing> {
    const entity = await this.repository.findOne({
      where: {
        id,
      },
    });
    return this.mapper.toDomain(entity);
  }

  async save(input: EventListing): Promise<void> {
    const entity = this.mapper.toEntity(input);

    await this.repository.save(entity);

    if (input.categories && input.categories.length > 0) {
      await this.eventCategoryRepository.saveMany(input.categories);
    }

    if (input.links && input.links.length > 0) {
      await this.eventLinkRepository.saveMany(input.links);
    }
  }

  async findOne(id: string, userId: string): Promise<EventListing> {
    const entity = await this.repository.findOne({
      where: {
        id,
        userId,
      },
    });
    return this.mapper.toDomain(entity);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.repository.findOne({
      where: { id },
    });
    await this.repository.remove(entity);
  }
}
