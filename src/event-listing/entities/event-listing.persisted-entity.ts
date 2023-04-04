import { AbstractPersistedEntity } from 'src/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { EventCategoryPersistedEntity, EventLinkPersistedEntity } from 'src/event-listing/entities';
import { EventListingStatus } from '../constants';

@Entity({ name: 'event_listings' })
export class EventListingPersistedEntity extends AbstractPersistedEntity {
  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @Column({ name: 'event_type_id', nullable: false })
  eventTypeId: string;

  @Column({ name: 'title', nullable: false })
  title: string;

  @Column({ name: 'slug', nullable: false })
  slug: string;

  @Column({ name: 'summary', nullable: true })
  summary: string;

  @Column({ name: 'banner_image_url', nullable: true })
  bannerImageUrl: string;

  @Column({ name: 'venue_name', nullable: true })
  venueName: string;

  @Column({ name: 'venue_address', nullable: true })
  venueAddress: string;

  @Column({ name: 'is_online_event', nullable: false })
  isOnlineEvent: boolean;

  @Column({ name: 'guest_pays_transaction_fee', nullable: false })
  guestPaysTransactionFee: boolean;

  @Column({ name: 'status', nullable: false, default: EventListingStatus.DRAFT })
  status: EventListingStatus;

  @Column({ name: 'start_at', nullable: false })
  startAt: Date;

  @Column({ name: 'ends_at', nullable: false })
  endsAt: Date;

  @OneToMany(
    () => EventCategoryPersistedEntity,
    (eventCategory) => eventCategory.eventListing,
    {
      eager: true,
    },
  )
  eventCategories?: EventCategoryPersistedEntity[];

  @OneToMany(
    () => EventLinkPersistedEntity,
    (eventLink) => eventLink.eventListing,
    {
      eager: true,
    },
  )
  links?: EventLinkPersistedEntity[];
}
