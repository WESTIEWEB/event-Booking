import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CategoryDto } from 'src/event-listing/dtos';
import { EventListingProviders } from 'src/event-listing/event-listing.providers';
import { ICategoryReadRepository } from 'src/event-listing/interfaces';
import { GetCategoryQuery } from '../impl';

@Injectable()
@QueryHandler(GetCategoryQuery)
export class GetCategoryHandler implements IQueryHandler<GetCategoryQuery, CategoryDto | null> {
  constructor(
    @Inject(EventListingProviders.CategoryReadRepository)
    private readonly repository: ICategoryReadRepository,
  ) {}

  async execute(query: GetCategoryQuery): Promise<CategoryDto | null> {
    const category = await this.repository.findOne(query.id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
}
