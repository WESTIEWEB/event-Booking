import { AbstractPersistedEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class UserPersistedEntity extends AbstractPersistedEntity {
  @Column({ unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'salt' })
  passwordSalt: string;

  @Column({ name: 'dob', nullable: true })
  dob: string;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ name: 'email_verified' })
  emailVerified: boolean;

  @Column({ name: 'phone_number_verified' })
  phoneNumberVerified: boolean;
}
