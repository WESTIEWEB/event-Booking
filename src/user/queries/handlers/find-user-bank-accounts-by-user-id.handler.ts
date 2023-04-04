import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginatedDto } from 'src/common/dtos';
import { UserBankAccountDto } from 'src/user/dtos';
import { IUserBankAccountReadRepository } from 'src/user/interfaces';
import { UserProviders } from 'src/user/user.providers';
import { FindUserBankAccountsByUserIdQuery } from '../impl';

@Injectable()
@QueryHandler(FindUserBankAccountsByUserIdQuery)
export class FindUserBankAccountsByUserIdHandler implements IQueryHandler<FindUserBankAccountsByUserIdQuery, PaginatedDto<UserBankAccountDto>> {
  constructor(
    @Inject(UserProviders.UserBankAccountReadRepository)
    private readonly repository: IUserBankAccountReadRepository,
  ) {}

  async execute(query: FindUserBankAccountsByUserIdQuery): Promise<PaginatedDto<UserBankAccountDto>> {
    const { userId, options } = query;
    return this.repository.find({
      userId,
      ...options,
    });
  }
}
