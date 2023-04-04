import { EventType } from '../domains';
import { EventTypeDto } from '../dtos';

export interface IEventTypeRepository {
  create(eventType: EventType): Promise<EventTypeDto>;
}
