import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserDto } from 'src/user/dtos';
import { IUserReadRepository } from 'src/user/interfaces';
import { UserProviders } from 'src/user/user.providers';
import { FindByEmailQuery } from '../impl';

@Injectable()
@QueryHandler(FindByEmailQuery)
export class FindByEmailQueryHandler implements IQueryHandler<FindByEmailQuery, UserDto> {
  constructor(
    @Inject(UserProviders.UserReadRepository)
    private readonly repository: IUserReadRepository,
  ) {}

  execute(query: FindByEmailQuery): Promise<UserDto> {
    return this.repository.findByEmail(query.email);
  }
}
