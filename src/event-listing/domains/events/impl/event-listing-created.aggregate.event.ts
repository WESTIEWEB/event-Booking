/* eslint-disable import/no-cycle */
import { EventListing } from '../../event-listing';

export class EventListingCreatedAggregateEvent {
  constructor(public readonly listing: EventListing) {}
}
