import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginatedDto } from 'src/common/dtos';
import { EventListingDto } from 'src/event-listing/dtos';
import { EventListingProviders } from 'src/event-listing/event-listing.providers';
import { IEventListingReadRepository } from 'src/event-listing/interfaces';
import { GetAllEventListingsQuery } from '../impl';

@Injectable()
@QueryHandler(GetAllEventListingsQuery)
export class GetAllEventListingsHandler implements IQueryHandler<GetAllEventListingsQuery, PaginatedDto<EventListingDto>> {
  constructor(
    @Inject(EventListingProviders.EventListingReadRepository)
    private readonly repository: IEventListingReadRepository,
  ) {}

  execute(query: GetAllEventListingsQuery) {
    return this.repository.getAll(query.options);
  }
}
