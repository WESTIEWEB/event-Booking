import * as Joi from 'joi';
import { LoginWithEmailDto } from '../dtos';

export const loginSchema = Joi.object<LoginWithEmailDto>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
