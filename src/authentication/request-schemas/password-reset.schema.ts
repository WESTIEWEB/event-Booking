import * as Joi from 'joi';
import { CompletePasswordResetDto } from '../dtos';

export const completePasswordResetSchema = Joi.object<CompletePasswordResetDto>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  resetToken: Joi.string().required(),
});
