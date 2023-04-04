import { CompletePasswordResetDto } from 'src/authentication/dtos';

export class CreatePasswordCommand {
  constructor(public input: CompletePasswordResetDto) {}
}
