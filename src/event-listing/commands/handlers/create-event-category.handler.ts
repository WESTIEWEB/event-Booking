import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventCategory } from 'src/event-listing/domains';
import { EventCategoryDto } from 'src/event-listing/dtos';
import { EventListingProviders } from 'src/event-listing/event-listing.providers';
import { ICategoryReadRepository, IEventCategoryRepository } from 'src/event-listing/interfaces';
import { CreateEventCategoryCommand } from '../impl';

@Injectable()
@CommandHandler(CreateEventCategoryCommand)
export class CreateEventCategoryHandler implements ICommandHandler<CreateEventCategoryCommand, EventCategoryDto> {
  constructor(
    @Inject(EventListingProviders.EventCategoryRepository)
    private readonly repository: IEventCategoryRepository,
    @Inject(EventListingProviders.CategoryReadRepository)
    private readonly categoryRepository: ICategoryReadRepository,
  ) {}

  async execute(command: CreateEventCategoryCommand): Promise<EventCategoryDto> {
    const { input } = command;
    const category = await this.categoryRepository.findOne(input.categoryId);

    if (!category) {
      throw new NotFoundException(`Category with id: ${input.categoryId} not found`);
    }

    const domain = EventCategory.create(input);

    const eventCategory = await this.repository.save(domain);

    domain.commit();

    return eventCategory;
  }
}
