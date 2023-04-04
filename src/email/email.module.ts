import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import { EmailProviders } from './email.providers';
import { EmailService, HtmlEmailTemplateService } from './services';
import configuration from './email.configuration';

@Module({})
export class EmailModule {
  public static forFeature(options: any): DynamicModule {
    return {
      module: EmailModule,
      imports: [
        ConfigModule.forFeature(configuration),
      ],
      providers: [
        {
          provide: EmailProviders.EmailTemplatePath,
          useValue: options.templatePath,
        },
        {
          provide: EmailProviders.EmailTransport,
          useFactory: (configService: ConfigService) => createTransport({
            service: 'gmail',
            auth: {
              user: configService.get<string>('email.transport.auth.user'),
              pass: configService.get<string>('email.transport.auth.password'),
            },
          }),
          inject: [ConfigService],
        },
        { provide: EmailProviders.HtmlEmailTemplateService, useClass: HtmlEmailTemplateService },
        { provide: EmailProviders.EmailService, useClass: EmailService },
      ],
      exports: [
        { provide: EmailProviders.EmailService, useClass: EmailService },
      ],
    };
  }
}
