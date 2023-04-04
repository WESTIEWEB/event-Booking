import { CreateUserDto } from 'src/user/dtos';

export class CreateUserCommand {
  constructor(public params: CreateUserDto) {}
}
