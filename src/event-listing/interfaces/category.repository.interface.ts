import { Category } from '../domains';
import { CategoryDto } from '../dtos';

export interface ICategoryRepository {
  findOne(id: string): Promise<Category>;
  save(category: Category): Promise<CategoryDto>
}
