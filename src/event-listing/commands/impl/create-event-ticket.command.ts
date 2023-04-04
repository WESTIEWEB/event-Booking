import { CreateEventTicketDto } from 'src/event-listing/dtos';

export class CreateEventTicketCommand {
  constructor(
    public readonly eventListingId: string,
    public readonly userId: string,
    public readonly ticket: CreateEventTicketDto,
  ) {}
}
