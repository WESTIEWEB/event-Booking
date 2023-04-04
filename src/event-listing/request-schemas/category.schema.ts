import * as Joi from 'joi';
import { CreateCategoryInputDto } from '../dtos';

export const createCategorySchema = Joi.object<CreateCategoryInputDto>({
  name: Joi.string().required(),
  slug: Joi.string().optional(),
  parentCategoryId: Joi.string().optional(),
  description: Joi.string().optional(),
  active: Joi.boolean().optional(),
});

export const updateCategorySchema = createCategorySchema.fork([
  'name',
  'slug',
  'parentCategoryId',
  'description',
  'active',
], (schema) => schema.optional());
