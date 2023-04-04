export interface WalletDto {
  id: string;
  userId: string;
  availableBalance: number;
  ledgerBalance: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateWalletDto = Omit<WalletDto, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateWalletDto = Partial<CreateWalletDto>;
