import { Inject, Injectable } from '@nestjs/common';
import {
  CommandHandler, EventBus, EventPublisher, ICommandHandler,
} from '@nestjs/cqrs';
import { UserPasswordUpdatedEvent } from 'src/user/events/impl';
import { IUserRepository } from 'src/user/interfaces';
import { UserProviders } from 'src/user/user.providers';
import { UpdateUserPasswordCommand } from '../impl';

@Injectable()
@CommandHandler(UpdateUserPasswordCommand)
export class UpdateUserPasswordHandler implements ICommandHandler<UpdateUserPasswordCommand> {
  constructor(
    @Inject(UserProviders.UserRepository)
    private readonly repository: IUserRepository,
    private readonly publisher: EventPublisher,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateUserPasswordCommand): Promise<void> {
    const { userId, password } = command;
    const userDomain = await this.repository.findById(userId);

    if (!userDomain) {
      throw new Error('User not found');
    }

    const user = this.publisher.mergeObjectContext(userDomain);

    user.updatePassword(password);

    await this.repository.save(user);

    user.commit();

    this.eventBus.publish(new UserPasswordUpdatedEvent(user));
  }
}
