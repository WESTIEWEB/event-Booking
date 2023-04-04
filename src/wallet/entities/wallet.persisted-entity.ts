import { AbstractPersistedEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'wallets' })
export class WalletPersistedEntity extends AbstractPersistedEntity {
  @Column({ name: 'user_id', unique: true })
  userId: string;

  @Column({ name: 'available_balance' })
  availableBalance: number;

  @Column({ name: 'ledger_balance' })
  ledgerBalance: number;

  @Column({ name: 'currency' })
  currency: string;
}
