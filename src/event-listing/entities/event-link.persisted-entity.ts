import { AbstractPersistedEntity } from 'src/common';
import {
  Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { EventListingPersistedEntity } from 'src/event-listing/entities';

@Entity({ name: 'event_links' })
export class EventLinkPersistedEntity extends AbstractPersistedEntity {
  @ManyToOne(() => EventListingPersistedEntity, (eventListing) => eventListing.links)
  @JoinColumn({ name: 'event_listing_id' })
  eventListing?: EventListingPersistedEntity;

  @Column({ name: 'event_listing_id', nullable: false })
  eventListingId: string;

  @Column({ name: 'label', nullable: false })
  label: string;

  @Column({ name: 'url', nullable: false })
  url: string;

  @Column({ name: 'description', nullable: true })
  description: string;
}
