import {
  PaystackApiResponse,
  PaystackBalanceResponse,
  PaystackBanksResponse,
  PaystackInitializePaymentResponse,
  PaystackResolveAccountResponse,
  PaystackTransferRecipientResponse,
  PaystackTransferResponse,
  PaystackTransferVerifyResponse,
  PaystackVerifyTransactionResponse,
} from './responses.interface';

export type TransferRecipientType = 'nuban' | 'mobile_money' | 'basa';

export type TransferSource = 'balance';

export interface IntializePaymentOptions {
  amount: number;
  email: string;
  currency: string;
  reference: string;
  callback_url: string;
}

export interface CreateTransferRecipientOptions {
  type: TransferRecipientType | string;
  name: string;
  account_number: string;
  bank_code: string;
  currency: string;
  authorization_code?: string;
  metadata?: any;
}

export interface CreateTransferOptions {
  source: TransferSource | string;
  amount: number;
  recipient: string;
  reason?: string;
  currency?: string;
  reference?: string;
}

export interface IPaystackService {
  initializePayment(options: IntializePaymentOptions): Promise<PaystackApiResponse<PaystackInitializePaymentResponse>>;
  verifyPayment(reference: string): Promise<PaystackApiResponse<PaystackVerifyTransactionResponse>>;
  createTransferRecipient(options: CreateTransferRecipientOptions): Promise<PaystackApiResponse<PaystackTransferRecipientResponse>>;
  createTransfer(options: CreateTransferOptions): Promise<PaystackApiResponse<PaystackTransferResponse>>;
  verifyTransfer(reference: string): Promise<PaystackApiResponse<PaystackTransferVerifyResponse>>;
  resolveAccountNumber(accountNumber: string, bankCode: string): Promise<PaystackApiResponse<PaystackResolveAccountResponse>>;
  getBalance(): Promise<PaystackApiResponse<PaystackBalanceResponse>>;
  getBanks(): Promise<PaystackApiResponse<PaystackBanksResponse[]>>;
}
