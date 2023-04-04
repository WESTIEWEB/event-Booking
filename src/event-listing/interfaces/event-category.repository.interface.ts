import { EventCategory } from '../domains';
import { EventCategoryDto } from '../dtos';

export interface IEventCategoryRepository {
  save(eventCategory: EventCategory): Promise<EventCategoryDto>;
  saveMany(eventCategories: EventCategory[]): Promise<void>;
}
