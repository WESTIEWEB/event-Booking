import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaystackModule } from 'src/paystack';
import { PaymentTransctionPersistedEntity, PayoutRequestPersistedEntity } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PayoutRequestPersistedEntity,
      PaymentTransctionPersistedEntity,
    ]),
    PaystackModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class PaymentModule {}
