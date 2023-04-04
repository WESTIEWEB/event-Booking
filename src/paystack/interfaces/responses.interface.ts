export interface PaystackApiResponse<T = any> {
  status: boolean;
  message: string;
  data: T;
}

export interface PaystackInitializePaymentResponse {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface PaystackHistory {
  type: string;
  message: string;
  time: number;
}

export interface PaystackLog {
  start_time: number;
  time_spent: number;
  attempts: number;
  errors: number;
  success: boolean;
  mobile: boolean;
  input: any[];
  history: PaystackHistory[];
}

export interface PaystackAuthorization {
  authorization_code: string;
  bin: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  channel: string;
  card_type: string;
  bank: string;
  country_code: string;
  brand: string;
  reusable: boolean;
  signature: string;
  account_name?: any;
}

export interface Customer {
  id: number;
  first_name?: any;
  last_name?: any;
  email: string;
  customer_code: string;
  phone?: any;
  metadata?: any;
  risk_action: string;
  international_format_phone?: any;
}

export interface PaystackSplit {
  [key: string]: any;
}

export interface PaystackPlanObject {
  [key: string]: any;
}

export interface PaystackSubaccount {
  [key: string]: any;
}

export interface PaystackVerifyTransactionResponse {
  id: number;
  domain: string;
  status: string;
  reference: string;
  amount: number;
  message?: any;
  gateway_response: string;
  paid_at: Date;
  created_at: Date;
  channel: string;
  currency: string;
  ip_address: string;
  metadata: string;
  log: PaystackLog;
  fees: number;
  fees_split?: any;
  authorization: PaystackAuthorization;
  customer: Customer;
  plan?: any;
  split: PaystackSplit;
  order_id?: any;
  paidAt: Date;
  createdAt: Date;
  requested_amount: number;
  pos_transaction_data?: any;
  source?: any;
  fees_breakdown?: any;
  transaction_date: Date;
  plan_object: PaystackPlanObject;
  subaccount: PaystackSubaccount;
}

export interface PaystackBanksResponse {
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: any;
}

export interface PaystackResolveAccountResponse {
  account_number: string;
  account_name: string;
}

export interface PaystackTransferRecipientResponse {
  id: number;
  integration: number;
  name: string;
  recipient_code: string;
  type: string;
  details: {
    authorization_code: string | null;
    account_number: string;
    account_name: string;
    bank_code: string;
    bank_name: string;
  }
  createdAt: string;
  updatedAt: Date;
}

export interface PaystackTransferResponse {
  id: number;
  amount: number;
  recipient: number;
  transfer_code: string;
  source: string;
  currency: string;
  reason?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaystackTransferVerifyResponse {
  id: number;
  integration: number;
  recipient: {
    domain: string;
    type: string;
    currency: string;
    name: string;
    details: {
      account_number: string;
      account_name: any;
      bank_code: string;
      bank_name: string;
    };
    description: string;
    metadata: string;
    recipient_code: string;
    active: boolean;
    email: string | null;
    id: number;
    integration: number;
    createdAt: string;
    updatedAt: string;
  };
  reference: string;
  amount: number;
  status: string;
  transfer_code: string;
  source: string;
  source_details: any;
  currency: string;
  failures: any[] | null;
  reason: string | null;
  transfer_note: string | null;
  transfered_at: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaystackBalanceResponse {
  balance: number;
  currency: string;
}
