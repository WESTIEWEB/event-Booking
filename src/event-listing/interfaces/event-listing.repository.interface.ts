import { EventListing } from '../domains';

export interface IEventListingRepository {
  save(listing: EventListing): Promise<void>;
  findById(id: string): Promise<EventListing>;
  delete(id: string): Promise<void>;
}
