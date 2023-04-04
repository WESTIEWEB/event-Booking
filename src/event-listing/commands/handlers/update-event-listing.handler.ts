import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common/exceptions';
import { EventListingProviders } from 'src/event-listing/event-listing.providers';
import { IEventListingReadRepository, IEventListingRepository } from 'src/event-listing/interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { EventListingDto } from 'src/event-listing/dtos';
import { UpdateEventListingCommand } from '../impl';

@Injectable()
@CommandHandler(UpdateEventListingCommand)
export class UpdateEventListingHandler implements ICommandHandler<UpdateEventListingCommand, EventListingDto> {
  constructor(
    @Inject(EventListingProviders.EventListingRepository)
    private readonly repository: IEventListingRepository,
    @Inject(EventListingProviders.EventListingReadRepository)
    private readonly readRepository: IEventListingReadRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: UpdateEventListingCommand) : Promise<EventListingDto> {
    const { id, updates } = command;
    let listing = await this.repository.findById(id);

    if (!listing) {
      throw new NotFoundException('Event listing not found');
    }

    listing = this.publisher.mergeObjectContext(listing);

    listing.update(updates);

    await this.repository.save(listing);

    listing.commit();

    return this.readRepository.findById(id);
  }
}
