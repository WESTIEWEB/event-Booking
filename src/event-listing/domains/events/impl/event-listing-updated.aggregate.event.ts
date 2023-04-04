/* eslint-disable import/no-cycle */
import { EventListing } from '../../event-listing';

export class EventListingUpdatedAggregateEvent {
  constructor(public readonly listing: EventListing) {}
}
