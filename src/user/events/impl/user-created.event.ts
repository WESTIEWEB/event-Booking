import { UserDto } from 'src/user/dtos';

export class UserCreatedEvent {
  constructor(public readonly user: UserDto) {}
}
