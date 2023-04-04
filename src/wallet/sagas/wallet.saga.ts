import { Injectable } from '@nestjs/common';
import { Saga, ofType, ICommand } from '@nestjs/cqrs';
import {
  Observable, map, catchError, of,
} from 'rxjs';
import { AppLogger, InjectLogger } from 'src/logging';
import { UserCreatedEvent } from 'src/user/events/impl';
import { CreateWalletCommand } from '../commands/impl';
import { WALLET_CURRENCY } from '../wallet.constants';

@Injectable()
export class WalletSagas {
  constructor(
    @InjectLogger(WalletSagas.name)
    private readonly logger: AppLogger,
  ) {}

  @Saga()
  userCreated = (events$: Observable<any>): Observable<ICommand> => events$.pipe(
    ofType(UserCreatedEvent),
    map((event) => new CreateWalletCommand({
      userId: event.user.id,
      availableBalance: 0,
      ledgerBalance: 0,
      currency: WALLET_CURRENCY,
    })),
    catchError((err) => {
      this.logger.error({ err }, `Error handling ${UserCreatedEvent.name} event`);
      return of();
    }),
  );
}
