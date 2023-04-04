import { DomainObject } from 'src/common';

export interface WalletProps {
  userId: string;
  availableBalance: number;
  ledgerBalance: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Wallet extends DomainObject<WalletProps> {
  get userId(): string {
    return this.props.userId;
  }

  get availableBalance(): number {
    return this.props.availableBalance;
  }

  get ledgerBalance(): number {
    return this.props.ledgerBalance;
  }

  get currency(): string {
    return this.props.currency;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public static create(props: WalletProps, id?: string): Wallet {
    const now = new Date();
    const wallet = new Wallet({
      ...props,
      createdAt: props.createdAt ?? now,
      updatedAt: props.updatedAt ?? now,
    }, id);

    return wallet;
  }
}
