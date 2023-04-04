import { AbstractPersistedEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'user_bank_accounts' })
export class UserBankAccountPersistedEntity extends AbstractPersistedEntity {
  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @Column({ name: 'bank_name', nullable: false })
  bankName: string;

  @Column({ name: 'account_number', nullable: false })
  accountNumber: string;

  @Column({ name: 'account_name', nullable: true })
  accountName: string;

  @Column({ name: 'bank_code', nullable: false })
  bankCode: string;

  @Column({ name: 'provider_transfer_reference', nullable: true, unique: true })
  providerTransferReference: string;
}
