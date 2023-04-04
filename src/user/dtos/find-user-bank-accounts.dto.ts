import { PaginatedQueryDto } from 'src/common/dtos';

export interface FindUserBankAccountsDto extends PaginatedQueryDto {
  userId?: string;
  bankCode?: string;
  bankName?: string;
}
