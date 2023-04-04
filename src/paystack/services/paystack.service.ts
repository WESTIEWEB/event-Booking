/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  CreateTransferOptions,
  CreateTransferRecipientOptions,
  IntializePaymentOptions,
  IPaystackService,
  PaystackApiResponse,
  PaystackBalanceResponse,
  PaystackBanksResponse,
  PaystackInitializePaymentResponse,
  PaystackResolveAccountResponse,
  PaystackTransferRecipientResponse,
  PaystackTransferResponse,
  PaystackTransferVerifyResponse,
  PaystackVerifyTransactionResponse,
} from '../interfaces';

@Injectable()
export class PaystackService implements IPaystackService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  private isErrorStatus(status: number): boolean {
    return status >= 400 && status <= 599;
  }

  async resolveAccountNumber(accountNumber: string, bankCode: string): Promise<PaystackApiResponse<PaystackResolveAccountResponse>> {
    const url = `/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`;
    const request$ = this.httpService.get<PaystackApiResponse<PaystackResolveAccountResponse>>(url);
    const { status, data } = await firstValueFrom(request$);

    if (this.isErrorStatus(status)) {
      throw new Error(data.message);
    }

    return data;
  }

  async createTransferRecipient(options: CreateTransferRecipientOptions): Promise<PaystackApiResponse<PaystackTransferRecipientResponse>> {
    const request$ = this.httpService.post<PaystackApiResponse<PaystackTransferRecipientResponse>>('/transferrecipient', options);
    const { status, data } = await firstValueFrom(request$);

    if (this.isErrorStatus(status) || !data.status) {
      throw new Error(data.message);
    }

    return data;
  }

  async createTransfer(options: CreateTransferOptions): Promise<PaystackApiResponse<PaystackTransferResponse>> {
    const request$ = this.httpService.post<PaystackApiResponse<PaystackTransferResponse>>('/transfer', options);
    const { status, data } = await firstValueFrom(request$);

    if (this.isErrorStatus(status)) {
      throw new Error(data.message);
    }

    return data;
  }

  async verifyTransfer(reference: string): Promise<PaystackApiResponse<PaystackTransferVerifyResponse>> {
    const url = `/transfer/verify/${reference}`;
    const request$ = this.httpService.get<PaystackApiResponse<PaystackTransferVerifyResponse>>(url);
    const { status, data } = await firstValueFrom(request$);

    if (this.isErrorStatus(status)) {
      throw new Error(data.message);
    }

    return data;
  }

  async getBalance(): Promise<PaystackApiResponse<PaystackBalanceResponse>> {
    const request$ = this.httpService.get<PaystackApiResponse<PaystackBalanceResponse>>('/balance');
    const { status, data } = await firstValueFrom(request$);

    if (this.isErrorStatus(status)) {
      throw new Error(data.message);
    }

    return data;
  }

  async getBanks(): Promise<PaystackApiResponse<PaystackBanksResponse[]>> {
    const request$ = this.httpService.get<PaystackApiResponse<PaystackBanksResponse[]>>('/bank');
    const { data, status } = await firstValueFrom(request$);
    if (this.isErrorStatus(status)) {
      throw new Error(data.message);
    }

    return data;
  }

  async initializePayment(options: IntializePaymentOptions) {
    const request$ = this.httpService.post<PaystackApiResponse<PaystackInitializePaymentResponse>>(
      '/transaction/initialize',
      options,
    );
    const { data, status } = await firstValueFrom(request$);

    if (this.isErrorStatus(status)) {
      throw new Error(data.message);
    }

    return data;
  }

  async verifyPayment(reference: string): Promise<any> {
    const request$ = this.httpService.get<PaystackApiResponse<PaystackVerifyTransactionResponse>>(`/transaction/verify/${reference}`);
    const { data, status } = await firstValueFrom(request$);

    if (this.isErrorStatus(status)) {
      throw new Error(data.message);
    }

    return data;
  }
}
