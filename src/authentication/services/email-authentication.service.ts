import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ValidateEmailCredentialCommand } from '../commands/impl';
import { IEmailAuthenticationService } from '../interfaces';

@Injectable()
export class EmailAuthenticationService implements IEmailAuthenticationService {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  async authenticate(email: string, password: string): Promise<string> {
    return this.commandBus.execute(new ValidateEmailCredentialCommand(email, password));
  }
}
