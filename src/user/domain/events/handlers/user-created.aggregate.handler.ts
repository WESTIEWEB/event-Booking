import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent, UserEmailVerificationRequested } from 'src/user/events/impl';
import { UserMapper } from 'src/user/mappers';
import { UserCreatedAggregateEvent } from '../impl';

@EventsHandler(UserCreatedAggregateEvent)
export class UserCreatedAggregateHandler implements IEventHandler<UserCreatedAggregateEvent> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly mapper: UserMapper,
  ) {}

  handle(event: UserCreatedAggregateEvent) {
    const dto = this.mapper.toDto(event.user);

    if (!dto.emailVerified) {
      this.eventBus.publish(new UserEmailVerificationRequested(dto));
    }

    this.eventBus.publish(new UserCreatedEvent(dto));
  }
}
