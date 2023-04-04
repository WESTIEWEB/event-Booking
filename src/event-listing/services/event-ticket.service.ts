import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateEventTicketCommand } from '../commands/impl';
import { CreateEventTicketDto, EventTicketDto } from '../dtos';
import { IEventTicketService } from '../interfaces';
import { FindEventTicketsByEventListingIdQuery } from '../queries/impl';

@Injectable()
export class EventTicketService implements IEventTicketService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(eventListingId: string, userId: string, ticket: CreateEventTicketDto): Promise<EventTicketDto> {
    return this.commandBus.execute(new CreateEventTicketCommand(eventListingId, userId, ticket));
  }

  findByEventListingId(eventListingId: string): Promise<EventTicketDto[]> {
    return this.queryBus.execute(new FindEventTicketsByEventListingIdQuery(eventListingId));
  }
}
