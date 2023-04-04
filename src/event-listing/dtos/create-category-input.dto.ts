export interface CreateCategoryInputDto {
  name: string;
  parentCategoryId?: string;
  slug?: string;
  description?: string;
  active?: boolean;
}
