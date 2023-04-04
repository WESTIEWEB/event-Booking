import * as Joi from 'joi';
import { CreateUserDto } from '../dtos';

export const createUserSchema = Joi.object<CreateUserDto>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  phoneNumber: Joi.string().optional(),
});
