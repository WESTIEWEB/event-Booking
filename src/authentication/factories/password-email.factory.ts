import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';
import { SendEmailOptions } from 'src/email';

@Injectable()
/**
 * This factory is responsible for generating the emails message for password related events.
 */
export class PasswordEmailFactory {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  /**
   * Generates the message for the password reset requested event.
   * @param {string} email The email address of the user.
   * @param {string} token The token to be used for the password reset.
   * @param {number} expiresAt The timestamp when the token expires.
   * @returns The message for the password reset requested event.
   */
  passwordResetRequested(email: string, token: string, expiresAt: number): SendEmailOptions {
    const expiration = new Date(expiresAt);
    const expirationDate = moment(expiration).format('HH:MM:DD YYYY-MM-DD');
    const resetBaseUrl = this.configService.getOrThrow<string>('password.reset.reset_url');
    const resetUrl = `${resetBaseUrl}?token=${token}&email=${email}`;

    return {
      to: email,
      subject: 'Password reset requested',
      template: 'password-reset-requested',
      context: {
        token,
        expiresAt: expirationDate,
        resetUrl,
      },
    };
  }
}
