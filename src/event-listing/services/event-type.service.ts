import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PaginatedDto } from 'src/common/dtos';
import { CreateEventTypeCommand } from '../commands/impl';
import { CreateEventTypeDto, EventTypeDto, GetAllEventTypesQueryDto } from '../dtos';
import { IEventTypeService } from '../interfaces';
import { GetAllEventTypesQuery } from '../queries/impl';

@Injectable()
export class EventTypeService implements IEventTypeService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  getAll(options: GetAllEventTypesQueryDto): Promise<PaginatedDto<EventTypeDto>> {
    return this.queryBus.execute(new GetAllEventTypesQuery(options));
  }

  create(input: CreateEventTypeDto): Promise<EventTypeDto> {
    return this.commandBus.execute(new CreateEventTypeCommand(input));
  }
}
