import { User } from 'src/user/domain';
import { IUserRepository } from 'src/user/interfaces';
import { ValidateUserPasswordCommand } from '../impl';
import { ValidateUserPasswordCommandHandler } from './validate-user-password.handler';

const repository = {
  findById: jest.fn(),
} as any as IUserRepository;

const user = {
  validatePassword: jest.fn(),
} as any as User;

const handler = new ValidateUserPasswordCommandHandler(repository);

describe('ValidateUserPasswordHandler', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    (<jest.Mock>repository.findById).mockResolvedValue(user);
    (<jest.Mock>user.validatePassword).mockResolvedValue(true);
  });

  it('should return false if user is not found', async () => {
    (<jest.Mock>repository.findById).mockResolvedValue(null);

    const command = new ValidateUserPasswordCommand('id', 'password');
    const result = await handler.execute(command);

    expect(repository.findById).toHaveBeenCalledWith('id');
    expect(result).toBe(false);
  });

  it('should return false if user password is incorrect', async () => {
    (<jest.Mock>user.validatePassword).mockResolvedValue(false);

    const command = new ValidateUserPasswordCommand('id', 'password');
    const result = await handler.execute(command);

    expect(repository.findById).toHaveBeenCalledWith('id');
    expect(user.validatePassword).toHaveBeenCalledWith('password');
    expect(result).toBe(false);
  });

  it('should return true if user password is correct', async () => {
    const command = new ValidateUserPasswordCommand('id', 'password');
    const result = await handler.execute(command);

    expect(repository.findById).toHaveBeenCalledWith('id');
    expect(user.validatePassword).toHaveBeenCalledWith('password');
    expect(result).toBe(true);
  });
});
