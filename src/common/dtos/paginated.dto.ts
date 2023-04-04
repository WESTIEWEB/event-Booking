export interface PaginatedDto<T> {
  totalCount: number;
  items: T[];
}
