import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/common/interfaces';
import { EventListing } from '../domains';
import { EventListingDto } from '../dtos';
import { EventListingPersistedEntity } from '../entities';

@Injectable()
export class EventListingMapper implements IMapper<EventListing, EventListingPersistedEntity, EventListingDto> {
  toDto(domain: EventListing): EventListingDto {
    return {
      id: domain.id,
      userId: domain.userId,
      eventTypeId: domain.eventTypeId,
      bannerImageUrl: domain.bannerImageUrl,
      title: domain.title,
      slug: domain.slug,
      summary: domain.summary,
      isOnlineEvent: domain.isOnlineEvent,
      guestPaysTransactionFee: domain.guestPaysTransactionFee,
      venueAddress: domain.venueAddress,
      venueName: domain.venueName,
      status: domain.status,
      startAt: domain.startAt,
      endsAt: domain.endsAt,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  toDtoFromPersistence(entity: EventListingPersistedEntity): EventListingDto {
    const categories = entity.eventCategories && entity.eventCategories.length > 0
      ? entity.eventCategories.map((eventCategory) => ({
        id: eventCategory.category.id,
        name: eventCategory.category.name,
        slug: eventCategory.category.slug,
        active: eventCategory.category.active,
        description: eventCategory.category.description,
        createdAt: eventCategory.category.createdAt,
        updatedAt: eventCategory.category.updatedAt,
      }))
      : [];

    const links = entity.links && entity.links.length > 0
      ? entity.links.map((eventLink) => ({
        id: eventLink.id,
        eventListingId: eventLink.eventListingId,
        url: eventLink.url,
        label: eventLink.label,
        description: eventLink.description,
        createdAt: eventLink.createdAt,
        updatedAt: eventLink.updatedAt,
      }))
      : [];

    return {
      id: entity.id,
      userId: entity.userId,
      eventTypeId: entity.eventTypeId,
      bannerImageUrl: entity.bannerImageUrl,
      title: entity.title,
      slug: entity.slug,
      summary: entity.summary,
      isOnlineEvent: entity.isOnlineEvent,
      guestPaysTransactionFee: entity.guestPaysTransactionFee,
      venueAddress: entity.venueAddress,
      venueName: entity.venueName,
      status: entity.status,
      startAt: entity.startAt,
      endsAt: entity.endsAt,
      categories,
      links,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  toEntity(domain: EventListing): EventListingPersistedEntity {
    return {
      id: domain.id,
      userId: domain.userId,
      eventTypeId: domain.eventTypeId,
      bannerImageUrl: domain.bannerImageUrl,
      title: domain.title,
      slug: domain.slug,
      summary: domain.summary,
      isOnlineEvent: domain.isOnlineEvent,
      guestPaysTransactionFee: domain.guestPaysTransactionFee,
      venueAddress: domain.venueAddress,
      venueName: domain.venueName,
      status: domain.status,
      startAt: domain.startAt,
      endsAt: domain.endsAt,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  toDomain(entity: EventListingPersistedEntity): EventListing {
    return EventListing.create({
      userId: entity.userId,
      eventTypeId: entity.eventTypeId,
      bannerImageUrl: entity.bannerImageUrl,
      title: entity.title,
      slug: entity.slug,
      summary: entity.summary,
      isOnlineEvent: entity.isOnlineEvent,
      guestPaysTransactionFee: entity.guestPaysTransactionFee,
      venueAddress: entity.venueAddress,
      venueName: entity.venueName,
      status: entity.status,
      startAt: entity.startAt,
      endsAt: entity.endsAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }, entity.id);
  }
}
