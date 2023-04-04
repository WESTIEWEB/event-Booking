import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EventListingDto } from 'src/event-listing/dtos';
import { EventListingProviders } from 'src/event-listing/event-listing.providers';
import { IEventListingReadRepository } from 'src/event-listing/interfaces';
import { FindEventListingByIdQuery } from '../impl';

@Injectable()
@QueryHandler(FindEventListingByIdQuery)
export class FindEventListingByIdHandler implements IQueryHandler<FindEventListingByIdQuery, EventListingDto> {
  constructor(
    @Inject(EventListingProviders.EventListingReadRepository)
    private readonly repository: IEventListingReadRepository,
  ) {}

  execute(query: FindEventListingByIdQuery): Promise<EventListingDto> {
    return this.repository.findById(query.id);
  }
}
