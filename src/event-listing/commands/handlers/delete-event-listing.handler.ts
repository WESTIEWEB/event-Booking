import {
  Injectable, Inject, NotFoundException, ForbiddenException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventListingProviders } from 'src/event-listing/event-listing.providers';
import { IEventListingRepository } from 'src/event-listing/interfaces';
import { DeleteEventListingCommand } from '../impl';

@Injectable()
@CommandHandler(DeleteEventListingCommand)
export class DeleteEventListingHandler implements ICommandHandler<DeleteEventListingCommand> {
  constructor(
    @Inject(EventListingProviders.EventListingRepository)
    private readonly repository: IEventListingRepository,
  ) {}

  async execute(command: DeleteEventListingCommand): Promise<void> {
    const { id, userId } = command;

    const event = await this.repository.findById(id);
    if (!event) {
      throw new NotFoundException('Event listing not found');
    }

    if (event.userId !== userId) {
      throw new ForbiddenException('You are not allowed to delete this event listing');
    }

    event.delete();

    await this.repository.delete(id);
  }
}
