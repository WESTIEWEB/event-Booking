import { User } from 'src/user/domain';

export class UserUpdatedAggregateEvent {
  constructor(public user: User) {}
}
