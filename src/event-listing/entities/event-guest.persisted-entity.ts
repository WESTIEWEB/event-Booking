import { AbstractPersistedEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'event_guests' })
export class EventGuestPersistedEntity extends AbstractPersistedEntity {
  @Column({ name: 'event_listing_id', nullable: false })
  eventListingId: string;

  @Column({ name: 'event_ticket_id', nullable: false })
  eventTicketId: string;

  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', nullable: false })
  lastName: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'phone_number', nullable: false })
  phoneNumber: string;
}
