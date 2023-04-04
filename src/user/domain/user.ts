/* eslint-disable import/no-cycle */
import { UnprocessableEntityException } from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { DomainObject } from 'src/common';
import { UserCreatedAggregateEvent, UserUpdatedAggregateEvent } from './events/impl';
// eslint-disable-next-line import/no-extraneous-dependencies

export interface UserProps {
  email: string;
  password?: string;
  passwordSalt?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  phoneNumber?: string;
  emailVerified: boolean;
  phoneNumberVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class User extends DomainObject<UserProps> {
  public static SALT_ROUNDS = 10;

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get passwordSalt(): string {
    return this.props.passwordSalt;
  }

  get firstName(): string | undefined {
    return this.props.firstName;
  }

  get dob(): string | undefined {
    return this.props.dob;
  }

  get lastName(): string | undefined {
    return this.props.lastName;
  }

  get phoneNumber(): string | undefined {
    return this.props.phoneNumber;
  }

  get emailVerified(): boolean {
    return this.props.emailVerified;
  }

  get phoneNumberVerified(): boolean {
    return this.props.phoneNumberVerified;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public static create(props: UserProps, id?: string): User {
    const { email, password } = props;
    const now = new Date();
    const isNew = id === undefined;

    if (!email) {
      throw new UnprocessableEntityException('Email is required');
    }

    if (password && password.length < 6) {
      throw new UnprocessableEntityException(
        'Password must be at least 6 characters long',
      );
    }

    const salt = props.passwordSalt ?? genSaltSync(User.SALT_ROUNDS);
    const hashedPassword = password ? hashSync(password, salt) : '';

    const user = new User({
      ...props,
      password: isNew && password ? hashedPassword : props.password, // Don't hash password if it's already hashed
      passwordSalt: salt,
      createdAt: props.createdAt ?? now,
      updatedAt: props.updatedAt ?? now,
    }, id);

    if (isNew) {
      user.apply(new UserCreatedAggregateEvent(user));
    }

    return user;
  }

  public async validatePassword(password: string) {
    return compareSync(password, this.props.password);
  }

  public registerUpdate() {
    this.props.updatedAt = new Date();
    this.apply(new UserUpdatedAggregateEvent(this));
  }

  public updatePassword(password: string) {
    const salt = genSaltSync(User.SALT_ROUNDS);
    const hashedPassword = hashSync(password, salt);

    this.props.password = hashedPassword;
    this.props.passwordSalt = salt;

    this.registerUpdate();
  }

  public verifyEmail() {
    this.props.emailVerified = true;
    this.registerUpdate();
  }
}
