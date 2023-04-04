export interface SendEmailOptions<T = any> {
  to: string;
  fromEmail?: string;
  fromName?: string;
  subject: string;
  text?: string;
  template?: string;
  context?: T;
}

export interface IEmailService {
  send(options: SendEmailOptions): Promise<void>;
}
