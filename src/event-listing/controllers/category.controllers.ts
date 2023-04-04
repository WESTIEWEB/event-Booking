import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { JoiValidationPipe } from 'src/common';
import { BaseController } from 'src/common/controllers';
import { CreateCategoryInputDto, UpdateCategoryDto } from '../dtos';
import { EventListingProviders } from '../event-listing.providers';
import { ICategoryService } from '../interfaces';
import { createCategorySchema, updateCategorySchema } from '../request-schemas';

@Controller('categories')
export class EventCategoryController extends BaseController {
  constructor(
    @Inject(EventListingProviders.CategoryService)
    private readonly categoryService: ICategoryService,
  ) {
    super();
  }

  @Get()
  async getCategories(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
    @Query('orderBy') orderBy: string = 'name',
    @Query('order') order: 'ASC' | 'DESC' = 'ASC',
  ) {
    const categories = await this.categoryService.getAll({
      limit,
      offset,
      orderBy,
      order,
    });
    return this.success({ ...categories });
  }

  @Get(':id')
  async getCategory(
    @Param('id') id: string,
  ) {
    const category = await this.categoryService.getOne(id);
    return this.success({ category });
  }

  @Post()
  async createCategory(
    @Body(new JoiValidationPipe(createCategorySchema)) input: CreateCategoryInputDto,
  ) {
    const category = await this.categoryService.create(input);
    return this.success({ category });
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(updateCategorySchema)) input: UpdateCategoryDto,
  ) {
    const category = await this.categoryService.update(id, input);
    return this.success({ category });
  }
}
