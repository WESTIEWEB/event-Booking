export interface CategoryDto {
  id: string;
  name: string;
  slug: string;
  description?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
