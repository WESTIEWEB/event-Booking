import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventType } from 'src/event-listing/domains';
import { EventTypeDto } from 'src/event-listing/dtos';
import { EventListingProviders } from 'src/event-listing/event-listing.providers';
import { IEventTypeRepository } from 'src/event-listing/interfaces';
import { CreateEventTypeCommand } from '../impl';

@Injectable()
@CommandHandler(CreateEventTypeCommand)
export class CreateEventTypeHandler implements ICommandHandler<CreateEventTypeCommand, EventTypeDto> {
  constructor(
    @Inject(EventListingProviders.EventTypeRepository)
    private readonly repoistory: IEventTypeRepository,
  ) {}

  async execute(command: CreateEventTypeCommand): Promise<EventTypeDto> {
    const { input } = command;
    const domain = EventType.create(input);

    const eventType = await this.repoistory.create(domain);

    return eventType;
  }
}
