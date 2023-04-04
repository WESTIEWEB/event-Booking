import { CreateEventListingDto } from 'src/event-listing/dtos';

export class CreateEventListingCommand {
  constructor(
    public readonly input: CreateEventListingDto,
  ) {}
}
