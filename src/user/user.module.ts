import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventListingModule } from 'src/event-listing';
import { AuthenticationModule } from 'src/authentication';
import { EmailModule } from 'src/email';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as RedisStore from 'cache-manager-redis-store';
import { PaystackModule } from 'src/paystack';
import { UserController } from './controllers';
import { UserBankAccountPersistedEntity, UserPersistedEntity } from './entities';
import * as Mappers from './mappers';
import * as Factories from './factories';
import * as Sagas from './sagas';
import * as CommandHandlers from './commands/handlers';
import * as QueryHandlers from './queries/handlers';
import * as DomainEventHandlers from './domain/events/handlers';
import { UserService } from './services';
import { UserProviders } from './user.providers';
import {
  UserBankAccountReadRepository,
  UserBankAccountRepository,
  UserReadRepository,
  UserRepository,
} from './repositories';
import configuration from './user.configuration';

@Module({
  imports: [
    CacheModule.register({
      useFactory(config: ConfigService) {
        return {
          store: RedisStore,
          host: config.get('REDIS_HOST', 'redis'),
          db: 0,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    CqrsModule,
    ConfigModule.forFeature(configuration),
    TypeOrmModule.forFeature([UserPersistedEntity, UserBankAccountPersistedEntity]),
    PaystackModule,
    EmailModule.forFeature({ templatePath: join(__dirname, './email-templates') }),
    forwardRef(() => AuthenticationModule),
    EventListingModule,
  ],
  controllers: [UserController],
  providers: [
    { provide: UserProviders.UserService, useClass: UserService },
    { provide: UserProviders.UserRepository, useClass: UserRepository },
    { provide: UserProviders.UserReadRepository, useClass: UserReadRepository },
    { provide: UserProviders.UserBankAccountRepository, useClass: UserBankAccountRepository },
    { provide: UserProviders.UserBankAccountReadRepository, useClass: UserBankAccountReadRepository },
    ...Object.values(Mappers),
    ...Object.values(Factories),
    ...Object.values(Sagas),
    ...Object.values(QueryHandlers),
    ...Object.values(CommandHandlers),
    ...Object.values(DomainEventHandlers),
  ],
  exports: [
    { provide: UserProviders.UserService, useClass: UserService },
  ],
})
export class UserModule {}
