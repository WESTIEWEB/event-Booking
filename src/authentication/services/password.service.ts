import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePasswordCommand, CreatePasswordResetCommand } from '../commands/impl';
import { CompletePasswordResetDto } from '../dtos';
import { IPasswordService } from '../interfaces';

@Injectable()
export class PasswordService implements IPasswordService {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  createPassword(input: CompletePasswordResetDto): Promise<boolean> {
    return this.commandBus.execute(new CreatePasswordCommand(input));
  }

  createPasswordReset(email: string): Promise<boolean> {
    return this.commandBus.execute(new CreatePasswordResetCommand(email));
  }
}
