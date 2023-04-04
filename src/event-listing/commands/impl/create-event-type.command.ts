import { CreateEventTypeDto } from 'src/event-listing/dtos';

export class CreateEventTypeCommand {
  constructor(
    public readonly input: CreateEventTypeDto,
  ) {}
}
