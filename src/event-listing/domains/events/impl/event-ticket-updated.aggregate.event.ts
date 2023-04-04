import { EventTicket } from '../../event-ticket';

export class EventTicketUpdatedAggregateEvent {
  constructor(public ticket: EventTicket) {}
}
