import { AbstractPersistedEntity } from 'src/common';
import { Column, Entity } from 'typeorm';
import { TransactionType } from '../constants';

@Entity({ name: 'wallet_transactions' })
export class WalletTransactionPersistedEntity extends AbstractPersistedEntity {
  @Column({ name: 'wallet_id', nullable: false })
  walletId: string;

  @Column({ name: 'transaction_type', nullable: false })
  transactionType: TransactionType;

  @Column({ name: 'amount' })
  amount: number;

  @Column({ nullable: true, name: 'narration' })
  narration: string;
}
