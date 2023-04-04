import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventCategory, EventLink, EventListing } from 'src/event-listing/domains';
import { EventListingDto } from 'src/event-listing/dtos';
import { EventListingProviders } from 'src/event-listing/event-listing.providers';
import { IEventListingReadRepository, IEventListingRepository } from 'src/event-listing/interfaces';
import { CreateEventListingCommand } from '../impl';

@Injectable()
@CommandHandler(CreateEventListingCommand)
export class CreateEventListingHandler implements ICommandHandler<CreateEventListingCommand, EventListingDto> {
  constructor(
    @Inject(EventListingProviders.EventListingRepository)
    private readonly repository: IEventListingRepository,
    @Inject(EventListingProviders.EventListingReadRepository)
    private readonly readRepository: IEventListingReadRepository,
  ) {}

  async execute(command: CreateEventListingCommand): Promise<EventListingDto> {
    const {
      eventTypeId,
      userId,
      title,
      summary,
      startAt,
      endsAt,
      venueAddress,
      venueName,
      bannerImageUrl,
      isOnlineEvent = false,
      guestPaysTransactionFee = false,
      categories = [],
      links = [],
    } = command.input;

    const domain = EventListing.create({
      title,
      summary,
      startAt,
      endsAt,
      venueAddress,
      venueName,
      bannerImageUrl,
      isOnlineEvent,
      guestPaysTransactionFee,
      eventTypeId,
      userId,
    });

    if (categories.length > 0) {
      const eventCategories = categories.map((category) => EventCategory.create({
        categoryId: category,
        eventListingId: domain.id,
      }));

      eventCategories.forEach((eventCategory) => domain.addCategory(eventCategory));
    }

    if (links.length > 0) {
      const eventLinks = links.map((link) => EventLink.create({
        url: link.url,
        label: link.label,
        eventListingId: domain.id,
        description: link.description,
        createdAt: undefined,
        updatedAt: undefined,
      }));

      eventLinks.forEach((eventLink) => domain.addLink(eventLink));
    }

    await this.repository.save(domain);

    domain.commit();

    return this.readRepository.findById(domain.id);
  }
}
