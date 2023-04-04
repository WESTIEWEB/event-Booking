import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as RedisStore from 'cache-manager-redis-store';
import { EmailModule } from 'src/email';
import { join } from 'path';
import { AuthenticationProviders } from './authentication.providers';
import { EmailAuthenticationService, PasswordService, TokenService } from './services';
import * as CommandHandlers from './commands/handlers';
import configuration from './authentication.configuration';
import { AuthController, PasswordController } from './controllers';
import * as Sagas from './sagas';
import * as Factories from './factories';

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
    JwtModule,
    ConfigModule.forFeature(configuration),
    forwardRef(() => UserModule),
    EmailModule.forFeature({ templatePath: join(__dirname, './email-templates') }),
  ],
  controllers: [
    AuthController,
    PasswordController,
  ],
  providers: [
    { provide: AuthenticationProviders.EmailAuthenticationService, useClass: EmailAuthenticationService },
    { provide: AuthenticationProviders.TokenService, useClass: TokenService },
    { provide: AuthenticationProviders.PasswordService, useClass: PasswordService },
    ...Object.values(CommandHandlers),
    ...Object.values(Factories),
    ...Object.values(Sagas),
  ],
  exports: [
    { provide: AuthenticationProviders.TokenService, useClass: TokenService },
  ],
})
export class AuthenticationModule {}
