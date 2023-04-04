/* eslint-disable import/no-cycle */
import { UnprocessableEntityException } from '@nestjs/common';
import { DomainObject } from 'src/common';
import { EventListingStatus } from '../constants';
import { slugify } from '../utils';
import { EventCategory } from './event-category';
import { EventLink } from './event-link';
import {
  EventListingCreatedAggregateEvent,
  EventListingDeletedAggregateEvent,
  EventListingUpdatedAggregateEvent,
} from './events/impl';

interface EventListingProps {
  eventTypeId: string;
  title: string;
  slug?: string;
  userId: string;
  summary?: string;
  bannerImageUrl?: string;
  venueName?: string;
  venueAddress?: string;
  isOnlineEvent: boolean;
  guestPaysTransactionFee?: boolean;
  status?: EventListingStatus;
  startAt: Date;
  endsAt: Date;
  categories?: EventCategory[];
  links?: EventLink[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class EventListing extends DomainObject<EventListingProps> {
  get eventTypeId(): string {
    return this.props.eventTypeId;
  }

  get title(): string {
    return this.props.title;
  }

  get slug(): string {
    return this.props.slug;
  }

  get userId(): string {
    return this.props.userId;
  }

  get summary(): string | undefined {
    return this.props.summary;
  }

  get bannerImageUrl(): string {
    return this.props.bannerImageUrl;
  }

  get venueName(): string | undefined {
    return this.props.venueName;
  }

  get venueAddress(): string | undefined {
    return this.props.venueAddress;
  }

  get isOnlineEvent(): boolean {
    return this.props.isOnlineEvent;
  }

  get guestPaysTransactionFee(): boolean {
    return this.props.guestPaysTransactionFee;
  }

  get status(): EventListingStatus {
    return this.props.status;
  }

  get startAt(): Date {
    return this.props.startAt;
  }

  get endsAt(): Date {
    return this.props.endsAt;
  }

  get categories(): EventCategory[] {
    return this.props.categories;
  }

  get links(): EventLink[] {
    return this.props.links;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public static create(props: EventListingProps, id?: string): EventListing {
    const now = new Date();
    const isNew = !!id;

    if (!props.eventTypeId) {
      throw new UnprocessableEntityException('Event type is required');
    }

    if (!props.title) {
      throw new UnprocessableEntityException('Title is required');
    }

    if (!props.userId) {
      throw new UnprocessableEntityException('User ID is required');
    }

    const listing = new EventListing({
      ...props,
      categories: props.categories ?? [],
      links: props.links ?? [],
      bannerImageUrl: props.bannerImageUrl ?? 'http://via.placeholder.com/640x360',
      slug: props.slug ?? slugify(props.title),
      isOnlineEvent: props.isOnlineEvent ?? false,
      guestPaysTransactionFee: props.guestPaysTransactionFee ?? false,
      status: props.status ?? EventListingStatus.DRAFT,
      createdAt: props.createdAt ?? now,
      updatedAt: props.updatedAt ?? now,
    }, id);

    if (isNew) {
      listing.apply(new EventListingCreatedAggregateEvent(listing));
    }

    return listing;
  }

  update(props: Partial<EventListingProps>): void {
    const now = new Date();

    if (props.title && props.title !== this.props.title) {
      this.props.title = props.title;
      this.props.slug = slugify(props.title);
    }

    this.props.summary = props.summary ?? this.props.summary;
    this.props.bannerImageUrl = props.bannerImageUrl ?? this.props.bannerImageUrl;
    this.props.venueName = props.venueName ?? this.props.venueName;
    this.props.venueAddress = props.venueAddress ?? this.props.venueAddress;
    this.props.isOnlineEvent = props.isOnlineEvent ?? this.props.isOnlineEvent;
    this.props.guestPaysTransactionFee = props.guestPaysTransactionFee ?? this.props.guestPaysTransactionFee;
    this.props.status = props.status ?? this.props.status;
    this.props.startAt = props.startAt ?? this.props.startAt;
    this.props.endsAt = props.endsAt ?? this.props.endsAt;
    this.props.updatedAt = now;

    this.apply(new EventListingUpdatedAggregateEvent(this));
  }

  delete(): void {
    this.apply(new EventListingDeletedAggregateEvent(this));
  }

  addCategory(category: EventCategory): void {
    const exist = this.props.categories.find((c) => c.categoryId === category.categoryId);
    if (!exist) {
      this.props.categories.push(category);
    }
  }

  addLink(link: EventLink): void {
    const exist = this.props.links.find((l) => l.url === link.url);
    if (!exist) {
      this.props.links.push(link);
    }
  }
}
