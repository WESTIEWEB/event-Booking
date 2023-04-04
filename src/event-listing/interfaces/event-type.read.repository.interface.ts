import { PaginatedDto } from 'src/common/dtos';
import { EventTypeDto, GetAllEventTypesQueryDto } from '../dtos';

export interface IEventTypeReadRepository {
  getAll(options: GetAllEventTypesQueryDto): Promise<PaginatedDto<EventTypeDto>>;
}
