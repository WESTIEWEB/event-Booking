import { TicketType } from '../constants';

export interface CreateEventTicketDto {
  type: TicketType,
  name: string;
  displayName: string;
  description?: string;
  price?: number;
  availableQuantity?: number;
  saleStartDate?: Date;
  saleEndDate?: Date;
}
