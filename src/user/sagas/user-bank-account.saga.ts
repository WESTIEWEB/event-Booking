import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import {
  catchError, map, Observable, of,
} from 'rxjs';
import { AppLogger, InjectLogger } from 'src/logging';
import { CreateBankAccountProviderReferenceCommand } from '../commands/impl';
import { UserBankAccountCreatedEvent } from '../events/impl';

@Injectable()
export class UserBankAccountSagas {
  constructor(
    @InjectLogger(UserBankAccountSagas.name)
    private readonly logger: AppLogger,
  ) {}

  @Saga()
  userBankAccountCreated = (events$: Observable<any>): Observable<ICommand> => events$.pipe(
    ofType(UserBankAccountCreatedEvent),
    map((event: UserBankAccountCreatedEvent) => {
      const { userBankAccount } = event;
      return new CreateBankAccountProviderReferenceCommand(userBankAccount.id);
    }),
    catchError((err) => {
      this.logger.error({ err }, `Error handling ${UserBankAccountCreatedEvent.name}`);
      return of();
    }),
  );
}
