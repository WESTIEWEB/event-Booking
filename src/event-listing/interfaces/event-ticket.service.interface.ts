import { CreateEventTicketDto, EventTicketDto } from '../dtos';

export interface IEventTicketService {
  findByEventListingId(eventListingId: string): Promise<EventTicketDto[]>;
  create(eventListingId: string, userId: string, ticket: CreateEventTicketDto): Promise<EventTicketDto>;
}
