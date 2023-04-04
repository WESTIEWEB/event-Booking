import { AbstractPersistedEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'event_order_items' })
export class EventOrderItemPersistedEntity extends AbstractPersistedEntity {
  @Column({ name: 'event_order_id', nullable: false })
  eventOrderId: string;

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

  @Column({ name: 'quantity', nullable: false })
  quantity: string;

  @Column({ name: 'total', nullable: false })
  total: string;
}
