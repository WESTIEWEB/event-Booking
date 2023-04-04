import { AbstractPersistedEntity } from 'src/common';
import { Column, Entity } from 'typeorm';
import { TicketType } from '../constants';

@Entity({ name: 'event_tickets' })
export class EventTicketPersistedEntity extends AbstractPersistedEntity {
  @Column({ name: 'event_listing_id', nullable: false })
  eventListingId: string;

  @Column({ name: 'type', nullable: false, default: TicketType.PAID })
  type: TicketType;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'display_name', nullable: false })
  displayName: string;

  @Column({ name: 'description', nullable: false })
  description: string;

  @Column({ name: 'price', nullable: false })
  price: number;

  @Column({ name: 'available_quantity', nullable: false })
  availableQuantity: number;

  @Column({ name: 'sale_start_date', nullable: false })
  saleStartDate: Date;

  @Column({ name: 'sale_end_date', nullable: false })
  saleEndDate: Date;
}
