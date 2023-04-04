import { PaginatedDto } from 'src/common/dtos';
import { FindUserBankAccountsDto, UserBankAccountDto } from '../dtos';

export interface IUserBankAccountReadRepository {
  findById(id: string): Promise<UserBankAccountDto | null>;
  find(options: FindUserBankAccountsDto): Promise<PaginatedDto<UserBankAccountDto>>;
}
