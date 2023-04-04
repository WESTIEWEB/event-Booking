import { Inject, Injectable } from '@nestjs/common';
import { existsSync, readFile } from 'fs';
import * as handlebars from 'handlebars';
import { EmailProviders } from '../email.providers';
import { IHtmlEmailTemplateService } from '../interfaces';

@Injectable()
export class HtmlEmailTemplateService implements IHtmlEmailTemplateService {
  constructor(
    @Inject(EmailProviders.EmailTemplatePath)
    private readonly templatePath: string,
  ) {}

  render<T = any>(template: string, context: T): Promise<string> {
    return new Promise((resolve, reject) => {
      const filePath = `${this.templatePath}/${template}.hbs`;

      if (!existsSync(filePath)) {
        reject(new Error(`Template ${template} not found in ${this.templatePath}`));
      }

      readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        }

        const renderer = handlebars.compile(data);
        const html = renderer(context);

        resolve(html);
      });
    });
  }
}
