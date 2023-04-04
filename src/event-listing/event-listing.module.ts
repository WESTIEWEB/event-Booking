import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from 'src/authentication';
import { CqrsModule } from '@nestjs/cqrs';
import { EventListingController, EventTypeController } from './controllers';
import {
  CategoryService,
  EventCategoriesService,
  EventListingService,
  EventTicketService,
  EventTypeService,
} from './services';
import {
  EventListingPersistedEntity,
  EventCategoryPersistedEntity,
  EventTypePersistedEntity,
  EventOrderPersistedEntity,
  EventOrderItemPersistedEntity,
  EventTicketPersistedEntity,
  EventLinkPersistedEntity,
  CategoryPersistedEntity,
} from './entities';
import { EventCategoryController } from './controllers/category.controllers';
import { EventListingProviders } from './event-listing.providers';
import {
  CategoryReadRepository,
  EventCategoryRepository,
  EventLinkReadRepository,
  EventLinkRepository,
  EventListingReadRepository,
  EventListingRepository,
  EventTicketReadRepository,
  EventTicketRepository,
  EventTypeReadRepository,
  EventTypeRepository,
} from './repositories';
import * as Mappers from './mappers';
import * as CommandHandlers from './commands/handlers';
import * as QueryHandlers from './queries/handlers';
import * as CliCommands from './cli-commands';
import { CategoryRepository } from './repositories/category.repository';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      CategoryPersistedEntity,
      EventListingPersistedEntity,
      EventCategoryPersistedEntity,
      EventTypePersistedEntity,
      EventOrderPersistedEntity,
      EventOrderItemPersistedEntity,
      EventTicketPersistedEntity,
      EventLinkPersistedEntity,
    ]),
    AuthenticationModule,
  ],
  controllers: [
    EventListingController,
    EventCategoryController,
    EventTypeController,
  ],
  providers: [
    { provide: EventListingProviders.EventListingRepository, useClass: EventListingRepository },
    { provide: EventListingProviders.EventListingReadRepository, useClass: EventListingReadRepository },
    { provide: EventListingProviders.EventTypeRepository, useClass: EventTypeRepository },
    { provide: EventListingProviders.EventTypeReadRepository, useClass: EventTypeReadRepository },
    { provide: EventListingProviders.EventTicketRepository, useClass: EventTicketRepository },
    { provide: EventListingProviders.EventTicketReadRepository, useClass: EventTicketReadRepository },
    { provide: EventListingProviders.EventCategoryRepository, useClass: EventCategoryRepository },
    { provide: EventListingProviders.CategoryRepository, useClass: CategoryRepository },
    { provide: EventListingProviders.CategoryReadRepository, useClass: CategoryReadRepository },
    { provide: EventListingProviders.EventLinkRepository, useClass: EventLinkRepository },
    { provide: EventListingProviders.EventLinkReadRepository, useClass: EventLinkReadRepository },
    { provide: EventListingProviders.EventTypeService, useClass: EventTypeService },
    { provide: EventListingProviders.EventListingService, useClass: EventListingService },
    { provide: EventListingProviders.EventTicketService, useClass: EventTicketService },
    { provide: EventListingProviders.CategoryService, useClass: CategoryService },
    ...Object.values(Mappers),
    ...Object.values(CommandHandlers),
    ...Object.values(QueryHandlers),
    ...Object.values(CliCommands),
    EventCategoriesService,
  ],
  exports: [
    { provide: EventListingProviders.EventListingService, useClass: EventListingService },
    { provide: EventListingProviders.EventTicketService, useClass: EventTicketService },
    ...Object.values(CliCommands),
  ],
})
export class EventListingModule {}
