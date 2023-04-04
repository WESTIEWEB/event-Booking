import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserBankAccountCreatedEvent } from 'src/user/events/impl';
import { UserBankAccountMapper } from 'src/user/mappers';
import { UserBankAccountCreatedAggregateEvent } from '../impl';

@EventsHandler(UserBankAccountCreatedAggregateEvent)
export class UserBankAccountCreatedAggregateEventHandler implements IEventHandler<UserBankAccountCreatedAggregateEvent> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly mapper: UserBankAccountMapper,
  ) {}

  handle(event: UserBankAccountCreatedAggregateEvent) {
    const dto = this.mapper.toDto(event.userBankAccount);
    this.eventBus.publish(new UserBankAccountCreatedEvent(dto));
  }
}
