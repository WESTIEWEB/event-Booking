import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginatedDto } from 'src/common/dtos';
import { CategoryDto } from 'src/event-listing/dtos';
import { EventListingProviders } from 'src/event-listing/event-listing.providers';
import { ICategoryReadRepository } from 'src/event-listing/interfaces';
import { GetAllCategoriesQuery } from '../impl';

@Injectable()
@QueryHandler(GetAllCategoriesQuery)
export class GetAllCategoriesHandler implements IQueryHandler<GetAllCategoriesQuery, PaginatedDto<CategoryDto>> {
  constructor(
    @Inject(EventListingProviders.CategoryReadRepository)
    private readonly repository: ICategoryReadRepository,
  ) {}

  execute(query: GetAllCategoriesQuery): Promise<PaginatedDto<CategoryDto>> {
    return this.repository.getAll(query.options);
  }
}
