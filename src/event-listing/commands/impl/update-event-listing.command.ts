import { UpdateEventDto } from 'src/event-listing/dtos';

export class UpdateEventListingCommand {
  constructor(
    public readonly id: string,
    public readonly updates: UpdateEventDto,
  ) {}
}
