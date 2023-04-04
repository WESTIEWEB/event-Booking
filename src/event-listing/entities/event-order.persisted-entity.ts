import { AbstractPersistedEntity } from 'src/common';
import { Column, Entity } from 'typeorm';
import { EventOrderStatus } from '../constants';

@Entity({ name: 'event_orders' })
export class EventOrderPersistedEntity extends AbstractPersistedEntity {
  @Column({ name: 'event_listing_id', nullable: false })
  eventListingId: string;

  @Column({ name: 'payment_transaction_id', nullable: false })
  paymentTransactionId: string;

  @Column({ name: 'transaction_fee', nullable: false })
  transactionFee: string;

  @Column({ name: 'order_sub_total', nullable: false })
  orderSubTotal: string;

  @Column({ name: 'order_total', nullable: false })
  orderTotal: string;

  @Column({ name: 'status', nullable: false, default: EventOrderStatus.PENDING })
  status: EventOrderStatus;
}
