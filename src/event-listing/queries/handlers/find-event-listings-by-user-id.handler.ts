import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginatedDto } from 'src/common/dtos';
import { EventListingDto } from 'src/event-listing/dtos';
import { EventListingProviders } from 'src/event-listing/event-listing.providers';
import { IEventListingReadRepository } from 'src/event-listing/interfaces';
import { FindEventListingsByUserIdQuery } from '../impl';

@Injectable()
@QueryHandler(FindEventListingsByUserIdQuery)
export class FindEventListingsByUserIdHandler
implements
    IQueryHandler<
    FindEventListingsByUserIdQuery,
    PaginatedDto<EventListingDto>
    > {
  constructor(
    @Inject(EventListingProviders.EventListingReadRepository)
    private readonly repository: IEventListingReadRepository,
  ) {}

  execute(
    query: FindEventListingsByUserIdQuery,
  ): Promise<PaginatedDto<EventListingDto>> {
    return this.repository.findByUserId(query.options);
  }
}
