export interface PaginatedQueryDto {
  limit: number;
  offset: number;
  orderBy?: string;
  order?: 'ASC' | 'DESC';
}
