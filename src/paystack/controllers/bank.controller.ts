import {
  Body, Controller, Get, Inject, Post,
} from '@nestjs/common';
import { BaseController } from 'src/common/controllers';
import { IPaystackService } from '../interfaces';
import { PaystackProviders } from '../paystack.providers';

@Controller('banks')
export class BankController extends BaseController {
  constructor(
    @Inject(PaystackProviders.PaystackService)
    private readonly paystackService: IPaystackService,
  ) {
    super();
  }

  @Get()
  async getBanks() {
    const { data } = await this.paystackService.getBanks();
    return this.success({ banks: data });
  }

  @Post('resolve')
  async resolveAccountNumber(
    @Body() body: {
      accountNumber: string;
      bankCode: string
    },
  ) {
    const { accountNumber, bankCode } = body;
    const { data } = await this.paystackService.resolveAccountNumber(accountNumber, bankCode);
    return this.success({ account: data });
  }
}
