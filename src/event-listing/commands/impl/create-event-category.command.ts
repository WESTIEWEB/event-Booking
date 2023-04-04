import { EventCategoryInputDto } from 'src/event-listing/dtos';

export class CreateEventCategoryCommand {
  constructor(public input: EventCategoryInputDto) {}
}
