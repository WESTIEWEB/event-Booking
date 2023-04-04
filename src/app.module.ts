import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from './database';
import { UserModule } from './user';
import { AuthenticationModule } from './authentication';
import { WalletModule } from './wallet';
import { EventListingModule } from './event-listing';
import { AppLoggerModule } from './logging';
import { EmailModule } from './email';
import { PaymentModule } from './payment';

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    AppLoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL ?? 'debug',
      },
    }),
    DatabaseModule,
    EmailModule,
    AuthenticationModule,
    UserModule,
    WalletModule,
    PaymentModule,
    EventListingModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
