import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PaginatedDto } from 'src/common/dtos';
import { CreateEventListingCommand, DeleteEventListingCommand, UpdateEventListingCommand } from '../commands/impl';
import {
  CreateEventListingDto, EventListingDto, GetAllEventListingsDto, GetEventListingsByUserIdDto, UpdateEventDto,
} from '../dtos';
import { IEventListingService } from '../interfaces';
import {
  FindEventListingByIdQuery,
  FindEventListingBySlugQuery,
  FindEventListingsByUserIdQuery,
  GetAllEventListingsQuery,
} from '../queries/impl';

@Injectable()
export class EventListingService implements IEventListingService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  findByUserId(options: GetEventListingsByUserIdDto): Promise<PaginatedDto<EventListingDto>> {
    return this.queryBus.execute(new FindEventListingsByUserIdQuery(options));
  }

  getAll(options: GetAllEventListingsDto): Promise<PaginatedDto<EventListingDto>> {
    return this.queryBus.execute(new GetAllEventListingsQuery(options));
  }

  findById(id: string): Promise<EventListingDto> {
    return this.queryBus.execute(new FindEventListingByIdQuery(id));
  }

  findBySlug(slug: string): Promise<EventListingDto> {
    return this.queryBus.execute(new FindEventListingBySlugQuery(slug));
  }

  create(input: CreateEventListingDto): Promise<EventListingDto> {
    return this.commandBus.execute(new CreateEventListingCommand(input));
  }

  update(id: string, event: UpdateEventDto): Promise<EventListingDto> {
    return this.commandBus.execute(new UpdateEventListingCommand(id, event));
  }

  delete(id: string, userId: string): Promise<void> {
    return this.commandBus.execute(new DeleteEventListingCommand(id, userId));
  }
}
