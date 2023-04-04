import { UserDto } from 'src/user/dtos';

export class UserEmailVerificationRequested {
  constructor(public readonly user: UserDto) {}
}
