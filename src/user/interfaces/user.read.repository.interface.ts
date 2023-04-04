import { UserDto } from '../dtos';

export interface IUserReadRepository {
  findById(id: string): Promise<UserDto | null>;
  findByEmail(email: string): Promise<UserDto | null>;
}
