import { PaginatedDto } from 'src/common/dtos';
import { CreateEventTypeDto, EventTypeDto, GetAllEventTypesQueryDto } from '../dtos';

export interface IEventTypeService {
  getAll(options: GetAllEventTypesQueryDto): Promise<PaginatedDto<EventTypeDto>>;
  create(input: CreateEventTypeDto): Promise<EventTypeDto>
}
