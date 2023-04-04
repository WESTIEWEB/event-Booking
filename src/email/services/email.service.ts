import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter } from 'nodemailer';
import { AppLogger, InjectLogger } from 'src/logging';
import { EmailProviders } from '../email.providers';
import { IEmailService, IHtmlEmailTemplateService, SendEmailOptions } from '../interfaces';

@Injectable()
export class EmailService implements IEmailService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(EmailProviders.EmailTransport)
    private readonly emailTransport: Transporter,
    @Inject(EmailProviders.HtmlEmailTemplateService)
    private readonly htmlEmailTemplateService: IHtmlEmailTemplateService,
    @InjectLogger(EmailService.name)
    private readonly logger: AppLogger,
  ) {
  }

  async send(options: SendEmailOptions) {
    let html: string | undefined;
    const {
      to, subject, template, context, text,
    } = options;

    if (template) {
      html = await this.htmlEmailTemplateService.render(template, context);
      this.logger.debug({ html }, 'Rendered email template');
    }

    return this.emailTransport.sendMail({
      to,
      subject,
      text,
      html,
      from: {
        name: this.configService.getOrThrow<string>('email.from.name'),
        address: this.configService.getOrThrow<string>('email.from.address'),
      },
    });
  }
}
