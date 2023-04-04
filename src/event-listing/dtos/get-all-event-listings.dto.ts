import { EventListingStatus } from '../constants';

export interface GetAllEventListingsDto {
  eventTypeId?: string;
  userId?: string;
  status?: EventListingStatus;
  limit: number;
  offset: number;
}
