import { User } from 'src/user/domain';

export class UserCreatedAggregateEvent {
  constructor(public user: User) {}
}
