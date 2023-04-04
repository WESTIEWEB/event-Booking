import { PaginatedDto } from 'src/common/dtos';
import { CategoryDto, GetAllCategoriesDto } from '../dtos';

export interface ICategoryReadRepository {
  getAll(options: GetAllCategoriesDto): Promise<PaginatedDto<CategoryDto>>;
  findOne(id: string): Promise<CategoryDto>;
}
