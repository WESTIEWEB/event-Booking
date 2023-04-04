import {
  ForbiddenException, Inject, Injectable, NotFoundException,
} from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EventTicket } from 'src/event-listing/domains';
import { EventTicketDto } from 'src/event-listing/dtos';
import { EventListingProviders } from 'src/event-listing/event-listing.providers';
import { IEventListingReadRepository, IEventTicketRepository } from 'src/event-listing/interfaces';
import { CreateEventTicketCommand } from '../impl';

@Injectable()
@CommandHandler(CreateEventTicketCommand)
export class CreateEventTicketHandler implements ICommandHandler<CreateEventTicketCommand, EventTicketDto> {
  constructor(
    @Inject(EventListingProviders.EventTicketRepository)
    private readonly ticketRepository: IEventTicketRepository,
    @Inject(EventListingProviders.EventListingReadRepository)
    private readonly listingRepository: IEventListingReadRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateEventTicketCommand) {
    const { eventListingId, userId, ticket } = command;
    // verify listing exists
    const listing = await this.listingRepository.findById(eventListingId);
    if (!listing) {
      throw new NotFoundException(`Event listing with id ${eventListingId} not found`);
    }
    // verify user is authorized to create ticket
    if (listing.userId !== userId) {
      throw new ForbiddenException('You are not authorized to create a ticket for this event listing');
    }

    const domain = this.publisher.mergeObjectContext(EventTicket.create({
      ...ticket,
      eventListingId,
    }));

    const eventTicket = await this.ticketRepository.save(domain);

    domain.commit();

    return eventTicket;
  }
}
