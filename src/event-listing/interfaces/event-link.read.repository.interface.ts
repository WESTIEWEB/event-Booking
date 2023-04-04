import { EventLinkDto } from '../dtos';

export interface IEventLinkReadRepository {
  findByEventListingId(eventListingId: string): Promise<EventLinkDto[]>;
  findById(id: string): Promise<EventLinkDto | null>;
}
