import { AbstractPersistedEntity } from 'src/common';
import { Column, Entity } from 'typeorm';
import { PayoutRequestStatus } from '../constants';

@Entity({ name: 'payout_requests' })
export class PayoutRequestPersistedEntity extends AbstractPersistedEntity {
  @Column({ name: 'wallet_id' })
  walletId: string;

  @Column({ name: 'user_bank_account_id' })
  userBankAccountId: string;

  @Column({ name: 'payment_transaction_id', nullable: true })
  paymentTransactionId: string;

  @Column({ name: 'amount' })
  amount: number;

  @Column({ name: 'status', default: PayoutRequestStatus.PENDING })
  status: PayoutRequestStatus;
}
