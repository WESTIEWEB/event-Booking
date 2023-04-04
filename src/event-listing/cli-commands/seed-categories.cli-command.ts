/* eslint-disable import/no-extraneous-dependencies */
import { Inject } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { AppLogger, InjectLogger } from 'src/logging';
import { CreateCategoryInputDto } from '../dtos';
import { EventListingProviders } from '../event-listing.providers';
import { ICategoryService } from '../interfaces';

@Command({
  name: 'seed-categories',
  description: 'Seed categories in database',
})
export class SeedCategoriesCommand extends CommandRunner {
  constructor(
    @Inject(EventListingProviders.CategoryService)
    private readonly categoryService: ICategoryService,
    @InjectLogger(SeedCategoriesCommand.name)
    private logger: AppLogger,
  ) {
    super();
  }

  async run() {
    const values: CreateCategoryInputDto[] = [
      {
        name: 'Music',
        slug: 'music',
        active: true,
      },
      {
        name: 'Sports & Fitness',
        slug: 'sports-fitness',
        active: true,
      },
      {
        name: 'Food & Drink',
        slug: 'food-drink',
        active: true,
      },
      {
        name: 'Health & Wellness',
        slug: 'health-wellness',
        active: true,
      },
      {
        name: 'Business & Networking',
        slug: 'business-networking',
        active: true,
      },
      {
        name: 'Arts & Culture',
        slug: 'arts-culture',
        active: true,
      },
      {
        name: 'Film, Media & Entertainment',
        slug: 'film-media-entertainment',
        active: true,
      },
    ];
    this.logger.debug('Running seed-categories command ...');

    const categories = values.map((value) => this.categoryService.create(value));

    await Promise.all(categories);

    this.logger.debug(`Seeded ${values.length} categories`);
  }
}
