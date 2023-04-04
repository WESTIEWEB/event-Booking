/* eslint-disable import/no-cycle */
import { AbstractPersistedEntity } from 'src/common';
import {
  Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { CategoryPersistedEntity } from './category.persisted-entity';
import { EventListingPersistedEntity } from './event-listing.persisted-entity';

@Entity({ name: 'event_categories' })
export class EventCategoryPersistedEntity extends AbstractPersistedEntity {
  @ManyToOne(() => EventListingPersistedEntity, (eventListing) => eventListing.eventCategories)
  @JoinColumn({ name: 'event_listing_id' })
  eventListing?: EventListingPersistedEntity;

  @ManyToOne(
    () => CategoryPersistedEntity,
    (category) => category.eventCategories,
    {
      eager: true,
    },
  )
  @JoinColumn({ name: 'category_id' })
  category?: CategoryPersistedEntity;

  @Column({ name: 'event_listing_id', nullable: false })
  eventListingId: string;

  @Column({ name: 'category_id', nullable: false })
  categoryId: string;
}
