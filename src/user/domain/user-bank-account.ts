import { DomainObject } from 'src/common';
import { UserBankAccountCreatedAggregateEvent, UserBankAccountUpdatedAggregateEvent } from './events/impl';

export interface UserBankAccountProps {
  userId: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  bankCode: string;
  providerTransferReference?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUserBankAccountProps = Omit<UserBankAccountProps, 'createdAt' | 'updatedAt'>;
export type UpdateUserBankAccountProps = Partial<Omit<UserBankAccountProps, 'createdAt' | 'updatedAt'>>;

export class UserBankAccount extends DomainObject<UserBankAccountProps> {
  get userId(): string {
    return this.props.userId;
  }

  get bankName(): string {
    return this.props.bankName;
  }

  get accountNumber(): string {
    return this.props.accountNumber;
  }

  get accountName(): string {
    return this.props.accountName;
  }

  get bankCode(): string {
    return this.props.bankCode;
  }

  get providerTransferReference(): string | undefined {
    return this.props.providerTransferReference;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public static create(props: CreateUserBankAccountProps, id?: string): UserBankAccount {
    const now = new Date();
    const isNew = id === undefined;

    const bankAccount = new UserBankAccount({
      ...props,
      createdAt: now,
      updatedAt: now,
    }, id);

    if (isNew) {
      bankAccount.apply(new UserBankAccountCreatedAggregateEvent(bankAccount));
    }

    return bankAccount;
  }

  public update(props: UpdateUserBankAccountProps): void {
    const now = new Date();

    this.props.accountNumber = props.accountNumber ?? this.props.accountNumber;
    this.props.accountName = props.accountName ?? this.props.accountName;
    this.props.bankCode = props.bankCode ?? this.props.bankCode;
    this.props.bankName = props.bankName ?? this.props.bankName;
    this.props.providerTransferReference = props.providerTransferReference ?? this.props.providerTransferReference;

    this.props.updatedAt = now;

    this.apply(new UserBankAccountUpdatedAggregateEvent(this));
  }
}
