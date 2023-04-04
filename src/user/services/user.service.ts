import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PaginatedDto } from 'src/common/dtos';
import {
  CreateUserBankAccountCommand, CreateUserCommand, UpdateUserPasswordCommand, ValidateUserPasswordCommand, VerifyUserEmailCommand,
} from '../commands/impl';
import {
  CreateUserBankAccountInputDto, CreateUserDto, UserBankAccountDto, UserDto,
} from '../dtos';
import { IUserService } from '../interfaces';
import { FindByEmailQuery, FindByIdQuery, FindUserBankAccountsByUserIdQuery } from '../queries/impl';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(params: CreateUserDto): Promise<UserDto> {
    return this.commandBus.execute(new CreateUserCommand(params));
  }

  findById(id: string): Promise<UserDto | null> {
    return this.queryBus.execute(new FindByIdQuery(id));
  }

  findByEmail(email: string): Promise<UserDto | null> {
    return this.queryBus.execute(new FindByEmailQuery(email));
  }

  validatePassword(id: string, password: string): Promise<boolean> {
    return this.commandBus.execute(new ValidateUserPasswordCommand(id, password));
  }

  updatePassword(id: string, password: string): Promise<boolean> {
    return this.commandBus.execute(new UpdateUserPasswordCommand(id, password));
  }

  createUserBankAccount(userId: string, input: CreateUserBankAccountInputDto): Promise<UserBankAccountDto> {
    return this.commandBus.execute(new CreateUserBankAccountCommand({
      ...input,
      userId,
    }));
  }

  findUserBankAccountByUserId(userId: string, options: any): Promise<PaginatedDto<UserBankAccountDto>> {
    return this.queryBus.execute(new FindUserBankAccountsByUserIdQuery(userId, options));
  }

  verifyEmail(id: string, token: string): Promise<string> {
    return this.commandBus.execute(new VerifyUserEmailCommand(id, token));
  }

  async isUserEmailVerified(id: string): Promise<boolean> {
    const user = await this.findById(id);
    if (!user) {
      return false;
    }

    return user.emailVerified;
  }
}
