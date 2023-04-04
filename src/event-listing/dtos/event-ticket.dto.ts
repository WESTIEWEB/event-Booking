import { TicketType } from '../constants';

export interface EventTicketDto {
  id: string;
  eventListingId: string;
  type: TicketType;
  name: string;
  displayName: string;
  description?: string;
  price: number;
  availableQuantity: number;
  saleStartDate?: Date;
  saleEndDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
