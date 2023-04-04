import { ITokenService } from 'src/authentication/interfaces';
import { UserDto } from 'src/user/dtos';
import { IUserService } from 'src/user/interfaces';
import { ValidateEmailCredentialCommand } from '../impl';
import { ValidateEmailCredentialCommandHandler } from './validate-email-credential.handler';

const userService = {
  findByEmail: jest.fn(),
  validatePassword: jest.fn(),
} as any as IUserService;

const tokenService = {
  issueToken: jest.fn(),
} as any as ITokenService;

const email = 'johndoe@gmail.com';
const password = 'password';

const user = {
  id: 'user-id',
} as any as UserDto;

const token = 'my-jwt-token';

const handler = new ValidateEmailCredentialCommandHandler(
  userService,
  tokenService,
);

describe('ValidateEmailCredentialCommandHandler', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    (<jest.Mock>userService.findByEmail).mockResolvedValue(user);
    (<jest.Mock>userService.validatePassword).mockResolvedValue(true);
    (<jest.Mock>tokenService.issueToken).mockReturnValue(token);
  });

  it('should throw an error if the user is not found', async () => {
    (<jest.Mock>userService.findByEmail).mockResolvedValue(null);

    const command = new ValidateEmailCredentialCommand(email, password);

    await expect(handler.execute(command)).rejects.toThrow('Invalid email or password');
  });

  it('should throw an error if the password is invalid', async () => {
    (<jest.Mock>userService.validatePassword).mockResolvedValue(false);

    const command = new ValidateEmailCredentialCommand(email, password);

    await expect(handler.execute(command)).rejects.toThrow('Invalid email or password');
  });

  it('returns a token if email and password is valid', async () => {
    const command = new ValidateEmailCredentialCommand(email, password);
    const result = await handler.execute(command);

    expect(userService.findByEmail).toHaveBeenCalledWith(email);
    expect(userService.validatePassword).toHaveBeenCalledWith(user.id, password);
    expect(result).toEqual(token);
  });
});
