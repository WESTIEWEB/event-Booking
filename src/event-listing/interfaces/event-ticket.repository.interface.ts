import { EventTicket } from '../domains';
import { EventTicketDto } from '../dtos';

export interface IEventTicketRepository {
  save(eventTicket: EventTicket): Promise<EventTicketDto>;
}
