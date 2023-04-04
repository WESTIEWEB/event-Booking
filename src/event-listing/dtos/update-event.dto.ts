import { EventListingStatus } from '../constants';

export interface UpdateEventDto {
  eventTypeId?: string;
  title?: string;
  slug?: string;
  summary?: string;
  bannerImageUrl: string;
  venueName?: string;
  venueAddress?: string;
  isOnlineEvent?: boolean;
  guestPaysTransactionFee?: boolean;
  status?: EventListingStatus;
}
