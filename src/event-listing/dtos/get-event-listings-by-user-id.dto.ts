export interface GetEventListingsByUserIdDto {
  userId: string;
  limit: number;
  offset: number;
  orderBy: string;
  order: 'ASC' | 'DESC';
}
