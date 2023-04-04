import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/common/interfaces';
import { User } from '../domain';
import { UserDto } from '../dtos';
import { UserPersistedEntity } from '../entities';

@Injectable()
export class UserMapper implements IMapper<User, UserPersistedEntity, UserDto> {
  toDto(domain: User): UserDto {
    return {
      id: domain.id,
      email: domain.email,
      firstName: domain.firstName,
      lastName: domain.lastName,
      dob: domain.dob,
      phoneNumber: domain.phoneNumber,
      emailVerified: domain.emailVerified,
      phoneNumberVerified: domain.phoneNumberVerified,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  toDtoFromPersistence(entity: UserPersistedEntity): UserDto {
    return {
      id: entity.id,
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
      dob: entity.dob,
      phoneNumber: entity.phoneNumber,
      emailVerified: entity.emailVerified,
      phoneNumberVerified: entity.phoneNumberVerified,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  toEntity(domain: User): UserPersistedEntity {
    return {
      id: domain.id,
      email: domain.email,
      password: domain.password,
      passwordSalt: domain.passwordSalt,
      dob: domain.dob,
      firstName: domain.firstName,
      lastName: domain.lastName,
      phoneNumber: domain.phoneNumber,
      emailVerified: domain.emailVerified,
      phoneNumberVerified: domain.phoneNumberVerified,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  toDomain(entity: UserPersistedEntity): User {
    return User.create(
      {
        email: entity.email,
        password: entity.password,
        passwordSalt: entity.passwordSalt,
        firstName: entity.firstName,
        dob: entity.dob,
        lastName: entity.lastName,
        phoneNumber: entity.phoneNumber,
        emailVerified: entity.emailVerified,
        phoneNumberVerified: entity.phoneNumberVerified,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
      entity.id,
    );
  }
}
