export interface GetAllCategoriesDto {
  limit: number;
  offset: number;
  orderBy: string;
  order: 'ASC' | 'DESC';
}
