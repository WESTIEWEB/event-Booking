import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { User } from 'src/user/domain';
import { UserDto } from 'src/user/dtos';
import { IUserReadRepository, IUserRepository } from 'src/user/interfaces';
import { UserProviders } from 'src/user/user.providers';
import { CreateUserCommand } from '../impl';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand, UserDto> {
  constructor(
    @Inject(UserProviders.UserRepository)
    private readonly repository: IUserRepository,
    @Inject(UserProviders.UserReadRepository)
    private readonly readRepository: IUserReadRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateUserCommand): Promise<UserDto> {
    const {
      email, password, firstName, lastName, phoneNumber, dob,
    } = command.params;

    const domain = User.create({
      email,
      password,
      firstName,
      lastName,
      dob,
      phoneNumber,
      emailVerified: false,
      phoneNumberVerified: false,
      passwordSalt: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    });
    const user = this.publisher.mergeObjectContext(domain);

    await this.repository.save(user);

    user.commit();

    return this.readRepository.findById(user.id);
  }
}
