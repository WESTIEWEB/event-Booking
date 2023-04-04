import { PaginatedDto } from 'src/common/dtos';
import {
  CreateUserBankAccountInputDto, CreateUserDto, UserBankAccountDto, UserDto,
} from '../dtos';

export interface IUserService {
  create(user: CreateUserDto): Promise<UserDto>;
  createUserBankAccount(userId: string, input: CreateUserBankAccountInputDto): Promise<UserBankAccountDto>;
  updatePassword(id: string, password: string): Promise<boolean>;
  findUserBankAccountByUserId(userId: string, options: any): Promise<PaginatedDto<UserBankAccountDto>>;
  findByEmail(email: string): Promise<UserDto>;
  validatePassword(id: string, password: string): Promise<boolean>;
  verifyEmail(id: string, token: string): Promise<string>;
  isUserEmailVerified(id: string): Promise<boolean>;
}
