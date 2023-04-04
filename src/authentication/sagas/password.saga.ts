import { Inject, Injectable } from '@nestjs/common';
import { Saga, ofType } from '@nestjs/cqrs';
import { from, Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { IEmailService } from 'src/email';
import { EmailProviders } from 'src/email/email.providers';
import { AppLogger, InjectLogger } from 'src/logging';
import { PasswordResetRequestedEvent } from '../events';
import { PasswordEmailFactory } from '../factories';

@Injectable()
export class PasswordSagas {
  constructor(
    @Inject(EmailProviders.EmailService)
    private readonly emailService: IEmailService,
    private readonly passwordEmailFactory: PasswordEmailFactory,
    @InjectLogger(PasswordSagas.name)
    private readonly logger: AppLogger,
  ) {}

  @Saga()
  passwordResetRequested = (events$: Observable<any>): Observable<any> => events$.pipe(
    ofType(PasswordResetRequestedEvent),
    map((event: PasswordResetRequestedEvent) => {
      this.logger.debug({ event }, 'Password reset requested');
      return this.passwordEmailFactory.passwordResetRequested(
        event.email,
        event.resetToken,
        event.expiresAt,
      );
    }),
    mergeMap((payload) => from(this.emailService.send(payload))),
    catchError((err) => {
      this.logger.error({ err }, `Error handling ${PasswordResetRequestedEvent.name}`);
      return of();
    }),
  );
}
