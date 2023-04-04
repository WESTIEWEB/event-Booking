import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateEventCategoryCommand } from '../commands/impl';
import { EventCategoryDto, EventCategoryInputDto } from '../dtos';

@Injectable()
export class EventCategoriesService {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  create(input: EventCategoryInputDto): Promise<EventCategoryDto> {
    return this.commandBus.execute(new CreateEventCategoryCommand(input));
  }
}
