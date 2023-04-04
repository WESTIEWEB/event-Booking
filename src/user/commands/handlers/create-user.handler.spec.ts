import { EventPublisher } from '@nestjs/cqrs';
import { User } from 'src/user/domain';
import { UserDto } from 'src/user/dtos';
import { IUserRepository, IUserReadRepository } from 'src/user/interfaces';
import { CreateUserCommand } from '../impl';
import { CreateUserHandler } from './create-user.handler';

const repository = {
  save: jest.fn(),
} as any as IUserRepository;

const readRepository = {
  findById: jest.fn(),
} as any as IUserReadRepository;

const publisher = {
  mergeObjectContext: jest.fn(),
} as any as EventPublisher;

const params = {
  email: 'johndoe@gmail.com',
  password: 'password',
};

const userDto = {} as any as UserDto;

const user = {
  id: 'id',
  commit: jest.fn(),
} as any as User;

const handler = new CreateUserHandler(repository, readRepository, publisher);

describe('CreateUserHandler', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(User, 'create').mockReturnValue(user);
    (<jest.Mock>publisher.mergeObjectContext).mockReturnValue(user);
    (<jest.Mock>readRepository.findById).mockResolvedValue(userDto);
  });

  it('should create a user', async () => {
    const command = new CreateUserCommand(params);
    const result = await handler.execute(command);

    expect(repository.save).toHaveBeenCalledWith(user);
    expect(readRepository.findById).toHaveBeenCalledWith(user.id);
    expect(result).toEqual(userDto);
  });
});
