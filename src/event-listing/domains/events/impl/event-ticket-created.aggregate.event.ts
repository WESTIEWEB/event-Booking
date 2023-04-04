import { EventTicket } from 'src/event-listing/domains';

export class EventTicketCreatedAggregateEvent {
  constructor(public ticket: EventTicket) {}
}
