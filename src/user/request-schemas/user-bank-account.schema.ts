import * as Joi from 'joi';
import { CreateUserBankAccountInputDto } from '../dtos';

export const createUserBankAccountSchema = Joi.object<Partial<CreateUserBankAccountInputDto>>({
  bankCode: Joi.string().required(),
  bankName: Joi.string().required(),
  accountNumber: Joi.string().required(),
  accountName: Joi.string().required(),
});
