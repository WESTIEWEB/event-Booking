import { CreateEventLinkDto } from './event-link.dto';

export interface CreateEventListingDto {
  title: string;
  userId: string;
  isOnlineEvent: boolean;
  eventTypeId: string;
  guestPaysTransactionFee: boolean;
  summary?: string;
  startAt: Date;
  endsAt: Date;
  bannerImageUrl?: string;
  venueName?: string;
  venueAddress?: string;
  categories?: string[],
  links?: CreateEventLinkDto[];
}
