import { AbstractPersistedEntity } from 'src/common';
import { Column, Entity } from 'typeorm';
import { PaymentTransactionStatus, PaymentTransactionType } from '../constants';

@Entity({ name: 'payment_transactions' })
export class PaymentTransctionPersistedEntity extends AbstractPersistedEntity {
  @Column({ nullable: false, unique: true })
  reference: string;

  @Column({
    name: 'provider_reference',
    nullable: false,
    unique: true,
  })
  providerReference: string;

  @Column({
    name: 'provider_message',
    nullable: true,
  })
  providerMessage: string;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ type: 'varchar', nullable: false })
  currency: string;

  @Column({ name: 'transaction_type', nullable: false })
  transactionType: PaymentTransactionType;

  @Column({ nullable: false })
  status: PaymentTransactionStatus;

  @Column({
    name: 'verified_at',
    nullable: true,
    type: 'timestamptz',
  })
  verifiedAt: Date;

  @Column({
    name: 'refunded_at',
    nullable: true,
    type: 'timestamptz',
  })
  refundedAt: Date;
}
