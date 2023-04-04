export interface GetAllEventTypesQueryDto {
  active?: boolean;
  limit: number;
  offset: number;
  orderBy?: string;
  order?: 'ASC' | 'DESC';
}
