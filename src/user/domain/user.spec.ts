import { User, UserProps } from './user';

describe('User', () => {
  it('should throw an error if no email is provided', () => {
    const props = {
      email: undefined,
      password: 'password',
    } as any as UserProps;

    expect(() => User.create(props)).toThrowError('Email is required');
  });

  it('should throw an error if no password is provided', () => {
    const props = {
      email: 'johndoe@gmail.com',
      password: undefined,
    } as any as UserProps;

    expect(() => User.create(props)).toThrowError('Password is required');
  });
});
