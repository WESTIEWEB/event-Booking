import { Inject, Injectable } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { from, Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { IEmailService } from 'src/email';
import { EmailProviders } from 'src/email/email.providers';
import { AppLogger, InjectLogger } from 'src/logging';
import { UserEmailVerificationRequested } from '../events/impl';
import { UserEmailFactory } from '../factories';

@Injectable()
export class UserVerificationSagas {
  constructor(
    @Inject(EmailProviders.EmailService)
    private readonly emailService: IEmailService,
    private readonly emailFactory: UserEmailFactory,
    @InjectLogger(UserVerificationSagas.name)
    private readonly logger: AppLogger,
  ) {}

  @Saga()
  userCreated = (events$: Observable<any>): Observable<void> => events$.pipe(
    ofType(UserEmailVerificationRequested),
    mergeMap((event: UserEmailVerificationRequested) => from(this.emailFactory.emailVerificationRequested(event)).pipe(
      mergeMap((payload) => from(this.emailService.send(payload))),
    )),
    catchError((err) => {
      this.logger.error({ err }, `Error handling ${UserEmailVerificationRequested.name}`);
      return of();
    }),
  );
}
