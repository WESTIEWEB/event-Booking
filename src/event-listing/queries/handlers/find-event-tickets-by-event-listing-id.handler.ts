import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EventTicketDto } from 'src/event-listing/dtos';
import { EventListingProviders } from 'src/event-listing/event-listing.providers';
import { IEventTicketReadRepository } from 'src/event-listing/interfaces';
import { FindEventTicketsByEventListingIdQuery } from '../impl';

@Injectable()
@QueryHandler(FindEventTicketsByEventListingIdQuery)
export class FindEventTicketsByEventListingIdHandler implements IQueryHandler<FindEventTicketsByEventListingIdQuery, EventTicketDto[]> {
  constructor(
    @Inject(EventListingProviders.EventTicketReadRepository)
    private readonly repository: IEventTicketReadRepository,
  ) {}

  execute(query: FindEventTicketsByEventListingIdQuery): Promise<EventTicketDto[]> {
    return this.repository.findByEventListingId(query.eventListingId);
  }
}
