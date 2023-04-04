import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginatedDto } from 'src/common/dtos';
import { EventTypeDto } from 'src/event-listing/dtos';
import { EventListingProviders } from 'src/event-listing/event-listing.providers';
import { IEventTypeReadRepository } from 'src/event-listing/interfaces';
import { GetAllEventTypesQuery } from '../impl';

@Injectable()
@QueryHandler(GetAllEventTypesQuery)
export class GetAllEventTypesHandler implements IQueryHandler<GetAllEventTypesQuery, PaginatedDto<EventTypeDto>> {
  constructor(
    @Inject(EventListingProviders.EventTypeReadRepository)
    private readonly repository: IEventTypeReadRepository,
  ) {}

  execute(query: GetAllEventTypesQuery): Promise<PaginatedDto<EventTypeDto>> {
    return this.repository.getAll(query.options);
  }
}
