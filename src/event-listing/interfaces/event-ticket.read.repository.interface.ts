import { EventTicketDto } from '../dtos';

export interface IEventTicketReadRepository {
  findByEventListingId(eventListingId: string, options?: any): Promise<EventTicketDto[]>;
}
