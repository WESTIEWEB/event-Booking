/* eslint-disable import/no-extraneous-dependencies */
import { Inject } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { AppLogger, InjectLogger } from 'src/logging';
import { CreateEventTypeDto } from '../dtos';
import { EventListingProviders } from '../event-listing.providers';
import { IEventTypeService } from '../interfaces';

@Command({
  name: 'seed-event-types',
  description: 'Seed event types in database',
})
export class SeedEventTypeCommand extends CommandRunner {
  constructor(
    @Inject(EventListingProviders.EventTypeService)
    private readonly service: IEventTypeService,
    @InjectLogger(SeedEventTypeCommand.name)
    private logger: AppLogger,
  ) {
    super();
  }

  async run() {
    const values: CreateEventTypeDto[] = [
      {
        name: 'Conference',
        active: true,
      },
      {
        name: 'Convention',
        active: true,
      },
      {
        name: 'Seminar',
        active: true,
      },
      {
        name: 'Class/Workshop',
        active: true,
      },
      {
        name: 'Festival/Fair',
        active: true,
      },
      {
        name: 'Expo/Trade Show',
        active: true,
      },
      {
        name: 'Game/Competition',
        active: true,
      },
      {
        name: 'Meeting/Networking',
        active: true,
      },
      {
        name: 'Concert/Performance',
        active: true,
      },
      {
        name: 'Other',
        active: true,
      },
    ];
    this.logger.debug('Running seed-event-types command ...');

    const types = values.map((value) => this.service.create(value));

    await Promise.all(types);

    this.logger.debug(`Seeded ${values.length} event types`);
  }
}
