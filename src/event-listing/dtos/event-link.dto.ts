export interface EventLinkDto {
  id: string;
  eventListingId: string;
  label: string;
  url: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateEventLinkDto = Omit<EventLinkDto, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateEventLinkDto = Omit<Partial<EventLinkDto>, 'id' | 'createdAt' | 'updatedAt'>;
