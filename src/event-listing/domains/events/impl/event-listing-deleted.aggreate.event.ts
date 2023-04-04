import { EventListing } from 'src/event-listing/domains';

export class EventListingDeletedAggregateEvent {
  constructor(public readonly listing: EventListing) {}
}
