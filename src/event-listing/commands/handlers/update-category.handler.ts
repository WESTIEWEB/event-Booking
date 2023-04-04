import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CategoryDto } from 'src/event-listing/dtos';
import { EventListingProviders } from 'src/event-listing/event-listing.providers';
import { ICategoryRepository } from 'src/event-listing/interfaces';
import { UpdateCategoryCommand } from '../impl';

@Injectable()
@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler implements ICommandHandler<UpdateCategoryCommand, CategoryDto> {
  constructor(
    @Inject(EventListingProviders.CategoryRepository)
    private readonly repository: ICategoryRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: UpdateCategoryCommand): Promise<CategoryDto> {
    const { id, input } = command;
    const domain = await this.repository.findOne(id);
    const category = this.publisher.mergeObjectContext(domain);

    category.update(input);

    const updated = await this.repository.save(category);

    category.commit();

    return updated;
  }
}
