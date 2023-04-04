import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaystackProviders } from './paystack.providers';
import { PaystackService } from './services';
import configuration from './paystack.configuration';
import { BankController } from './controllers';

@Module({
  imports: [
    ConfigModule.forFeature(configuration),
    HttpModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.getOrThrow<string>('paystack.api_url'),
        headers: {
          Authorization: `Bearer ${configService.getOrThrow<string>('paystack.secret_key')}`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [BankController],
  providers: [
    { provide: PaystackProviders.PaystackService, useClass: PaystackService },
  ],
  exports: [
    { provide: PaystackProviders.PaystackService, useClass: PaystackService },
  ],
})
export class PaystackModule {}
