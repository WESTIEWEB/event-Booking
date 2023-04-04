import { EventListingStatus } from '../constants';
import { CategoryDto } from './category.dto';
import { EventLinkDto } from './event-link.dto';

export interface EventListingDto {
  id: string;
  userId: string;
  eventTypeId: string;
  title: string;
  slug: string;
  summary?: string;
  bannerImageUrl: string;
  venueName?: string;
  venueAddress?: string;
  isOnlineEvent: boolean;
  guestPaysTransactionFee: boolean;
  status: EventListingStatus;
  startAt: Date;
  endsAt: Date;
  categories?: CategoryDto[];
  links?: EventLinkDto[];
  createdAt: Date;
  updatedAt: Date;
}
