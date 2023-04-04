import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserDto } from 'src/user/dtos';
import { IUserReadRepository } from 'src/user/interfaces';
import { UserProviders } from 'src/user/user.providers';
import { FindByIdQuery } from '../impl';

@Injectable()
@QueryHandler(FindByIdQuery)
export class FindByIdQueryHandler implements IQueryHandler<FindByIdQuery, UserDto> {
  constructor(
    @Inject(UserProviders.UserReadRepository)
    private readonly repository: IUserReadRepository,
  ) {}

  execute(query: FindByIdQuery): Promise<UserDto> {
    return this.repository.findById(query.id);
  }
}
