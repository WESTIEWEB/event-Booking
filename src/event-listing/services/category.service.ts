import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PaginatedDto } from 'src/common/dtos';
import { CreateCategoryCommand, UpdateCategoryCommand } from '../commands/impl';
import {
  CategoryDto, CreateCategoryInputDto, GetAllCategoriesDto, UpdateCategoryDto,
} from '../dtos';
import { ICategoryService } from '../interfaces';
import { GetAllCategoriesQuery, GetCategoryQuery } from '../queries/impl';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  getAll(options: GetAllCategoriesDto): Promise<PaginatedDto<CategoryDto>> {
    return this.queryBus.execute(new GetAllCategoriesQuery(options));
  }

  getOne(id: string): Promise<CategoryDto> {
    return this.queryBus.execute(new GetCategoryQuery(id));
  }

  create(input: CreateCategoryInputDto): Promise<CategoryDto> {
    return this.commandBus.execute(new CreateCategoryCommand(input));
  }

  update(id: string, input: UpdateCategoryDto): Promise<CategoryDto> {
    return this.commandBus.execute(new UpdateCategoryCommand(id, input));
  }
}
