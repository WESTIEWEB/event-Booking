import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Category } from 'src/event-listing/domains';
import { CategoryDto } from 'src/event-listing/dtos';
import { EventListingProviders } from 'src/event-listing/event-listing.providers';
import { ICategoryRepository } from 'src/event-listing/interfaces';
import { CreateCategoryCommand } from '../impl';

@Injectable()
@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<CreateCategoryCommand, CategoryDto> {
  constructor(
    @Inject(EventListingProviders.CategoryRepository)
    private readonly repository: ICategoryRepository,
  ) {}

  async execute(command: CreateCategoryCommand): Promise<CategoryDto> {
    const { input } = command;
    const domain = Category.create(input);

    const category = await this.repository.save(domain);

    domain.commit();

    return category;
  }
}
