import { User } from 'src/user/domain';

export class UserPasswordUpdatedEvent {
  constructor(public readonly user: User) {}
}
