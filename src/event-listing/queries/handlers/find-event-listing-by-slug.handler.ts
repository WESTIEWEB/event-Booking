import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EventListingDto } from 'src/event-listing/dtos';
import { EventListingProviders } from 'src/event-listing/event-listing.providers';
import { IEventListingReadRepository } from 'src/event-listing/interfaces';
import { FindEventListingBySlugQuery } from '../impl';

@Injectable()
@QueryHandler(FindEventListingBySlugQuery)
export class FindEventListingBySlugHandler implements IQueryHandler<FindEventListingBySlugQuery, EventListingDto> {
  constructor(
    @Inject(EventListingProviders.EventListingReadRepository)
    private readonly repository: IEventListingReadRepository,
  ) {}

  execute(query: FindEventListingBySlugQuery): Promise<EventListingDto> {
    return this.repository.findBySlug(query.slug);
  }
}
