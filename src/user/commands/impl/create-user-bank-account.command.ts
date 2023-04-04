import { CreateUserBankAccountInputDto } from 'src/user/dtos';

export class CreateUserBankAccountCommand {
  constructor(public readonly input: CreateUserBankAccountInputDto) {}
}
