import { PaginatedDto } from 'src/common/dtos';
import { CategoryDto, CreateCategoryInputDto, UpdateCategoryDto } from '../dtos';

export interface ICategoryService {
  getAll(options: any): Promise<PaginatedDto<CategoryDto>>;
  getOne(id: string): Promise<CategoryDto>;
  create(input: CreateCategoryInputDto): Promise<CategoryDto>;
  update(id: string, input: UpdateCategoryDto): Promise<CategoryDto>;
  delete?(id: string): Promise<void>;
}
